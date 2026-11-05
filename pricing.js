// pricing.js: the one place New Deal money math lives.
//
// Loaded three ways, always the same file:
//   - the builder page:       <script src="/pricing.js"></script>
//   - the edge function:      import './pricing.js'   (Deno; see catalog.ts)
//   - the test:               node scripts/new-deal-pricing-test.mjs
// It sets globalThis.RP_PRICING and has no dependencies.
//
// The model (all amounts in USD):
//   subscription S   sum over the packages of the first-year amount for the chosen plan
//                    full, split:  the annual price (list, or the rep's deal price)
//                    monthly:      round(annual / 10) x 12        (20% more than paying in full)
//                    quarterly:    round(annual / 10) x 3 x 4
//   discount D       on the subscription only, first year only: a percent of S, or an amount capped at S
//   setup fee F      one-time. Waived: the line stays at F with a matching credit W = F, so nothing is due for it
//   total T          S - D + F - W                 (the invoice: lines S + F, invoice discount D + W)
//   payments         full: 1.  monthly: 12, one a month.  quarterly: 4, every 3 months.  split: the rep's rows.
//                    The subscription net of discount is spread over the payments (evenly, or by the split shares).
//                    The setup fee that is due is added either
//                      'upfront'   all of it on the first payment (default), or
//                      'financed'  blended across every payment, in the same shares as the subscription.
//   Everything is computed in whole cents. A rounding remainder goes on the first payment for the even plans
//   and on the last row for a split, so the payments always add up to T exactly.
(function (root) {
  'use strict';
  var PLANS = ['full', 'split', 'quarterly', 'monthly'];
  var COUNT = { full: 1, quarterly: 4, monthly: 12 };
  var STEP = { quarterly: 3, monthly: 1 };

  function toCents(n) { return Math.round((Number(n) || 0) * 100); }
  function monthly(annual) { return Math.round((Number(annual) || 0) / 10); }
  function quarterly(annual) { return monthly(annual) * 3; }

  // Calendar months, keeping the day of the month where it exists (Jan 31 + 1 month = Feb 28/29).
  function addMonthsISO(iso, n) {
    var parts = String(iso).slice(0, 10).split('-').map(Number);
    var first = new Date(Date.UTC(parts[0], parts[1] - 1 + n, 1));
    var lastDay = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
    first.setUTCDate(Math.min(parts[2], lastDay));
    return first.toISOString().slice(0, 10);
  }

  function sum(a) { return a.reduce(function (x, y) { return x + y; }, 0); }
  function evenSplit(totalC, n) {
    var base = Math.floor(totalC / n), out = [];
    for (var i = 0; i < n; i++) out.push(base);
    out[0] += totalC - base * n;
    return out;
  }
  function shareSplit(totalC, pcts, exact) {
    var out = pcts.map(function (p) { return Math.round(totalC * p / 100); });
    if (exact && out.length) out[out.length - 1] += totalC - sum(out);
    return out;
  }

  function compute(packages, deal, startISO) {
    deal = deal || {};
    var plan = PLANS.indexOf(deal.plan) >= 0 ? deal.plan : 'full';
    var ids = deal.packages || [];
    var sel = (packages || []).filter(function (p) { return ids.indexOf(p.id) >= 0; });
    var used = function (p) { return deal.override && deal.override[p.id] != null ? Number(deal.override[p.id]) || 0 : p.annual; };

    var lines = sel.map(function (p) {
      var a = used(p);
      var per = plan === 'monthly' ? monthly(a) : plan === 'quarterly' ? quarterly(a) : a;
      var lineAmount = plan === 'monthly' ? per * 12 : plan === 'quarterly' ? per * 4 : a;
      var desc = deal.desc && deal.desc[p.id] != null ? deal.desc[p.id] : p.inc;
      return { pkg: p, unit: a, per: per, lineAmount: lineAmount, desc: String(desc || '').trim() };
    });
    var annualList = sum(sel.map(function (p) { return p.annual; }));
    var annualUsed = sum(lines.map(function (l) { return l.unit; }));
    var perMonth = sum(sel.map(function (p) { return monthly(used(p)); }));
    var perQuarter = sum(sel.map(function (p) { return quarterly(used(p)); }));

    var subC = toCents(sum(lines.map(function (l) { return l.lineAmount; })));
    var discC = 0;
    var discVal = Math.max(0, Number(deal.discVal) || 0);
    if (deal.discType === 'pct') discC = Math.round(subC * Math.min(100, discVal) / 100);
    if (deal.discType === 'amt') discC = Math.min(subC, toCents(discVal));
    var netC = subC - discC;

    var feeC = sel.length ? toCents(Math.max(0, Number(deal.fee) || 0)) : 0;
    var waiveC = deal.waive ? feeC : 0;
    var feeDueC = feeC - waiveC;
    var totalC = netC + feeDueC;

    // payment dates and shares
    var start = String(startISO || new Date().toISOString()).slice(0, 10);
    var rows = plan === 'split' ? (deal.split || []).filter(function (r) { return r; }) : [];
    if (plan === 'split' && !rows.length) rows = [{ pct: 100, date: start }];
    var n = plan === 'split' ? rows.length : COUNT[plan];
    var pcts = rows.map(function (r) { return Number(r.pct) || 0; });
    var splitSum = plan === 'split' ? sum(pcts) : 100;
    var valid = plan !== 'split' || Math.abs(splitSum - 100) < 1e-9;
    var dates = [];
    for (var i = 0; i < n; i++) dates.push(plan === 'split' ? String(rows[i].date || start).slice(0, 10) : addMonthsISO(start, i * (STEP[plan] || 0)));

    var feeMode = deal.feeMode === 'financed' && feeDueC > 0 && n > 1 ? 'financed' : 'upfront';
    var subParts = plan === 'split' ? shareSplit(netC, pcts, valid) : evenSplit(netC, n);
    var feeParts;
    if (feeMode === 'financed') {
      if (plan === 'split') { var all = shareSplit(netC + feeDueC, pcts, valid); feeParts = all.map(function (v, k) { return v - subParts[k]; }); }
      else feeParts = evenSplit(feeDueC, n);
    } else { feeParts = subParts.map(function () { return 0; }); feeParts[0] = feeDueC; }

    var payments = sel.length ? subParts.map(function (s, k) {
      return { n: k + 1, date: dates[k], amount: (s + feeParts[k]) / 100, sub: s / 100, fee: feeParts[k] / 100 };
    }) : [];
    // "then N payments of X": only when every payment after the first is the same amount
    var rest = null;
    if (payments.length > 1) {
      var same = payments.slice(1).every(function (p) { return p.amount === payments[1].amount; });
      if (same) rest = { count: payments.length - 1, amount: payments[1].amount, lastDate: payments[payments.length - 1].date };
    }

    return {
      plan: plan, sel: sel, lines: lines,
      annualList: annualList, annualUsed: annualUsed, perMonth: perMonth, perQuarter: perQuarter,
      subscription: subC / 100, base: subC / 100, disc: discC / 100, net: netC / 100,
      fee: feeC / 100, waive: waiveC / 100, feeDue: feeDueC / 100, feeMode: feeMode,
      gross: (subC + feeC) / 100, invoiceDiscount: (discC + waiveC) / 100, total: totalC / 100,
      count: n, every: plan === 'monthly' ? 'month' : plan === 'quarterly' ? '3 months' : null,
      payments: payments, rest: rest, today: payments.length ? payments[0].amount : 0,
      splitSum: splitSum, valid: valid, start: start, renews: addMonthsISO(start, 12),
    };
  }

  root.RP_PRICING = { compute: compute, monthly: monthly, quarterly: quarterly, addMonthsISO: addMonthsISO };
})(typeof globalThis !== 'undefined' ? globalThis : this);
