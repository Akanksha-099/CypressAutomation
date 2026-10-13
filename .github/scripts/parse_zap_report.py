#!/usr/bin/env python3
"""Parse ZAP report_json.json: print summary, export env vars for the Teams
card, and exit non-zero if any High/Critical alerts were found.

Replaces the inline Python heredocs that previously lived in the ZAP
workflows ("Print Alert Summary" + "Check for Critical Alerts" steps).
"""

import json
import os
import sys

REPORT_PATH = 'report_json.json'
LABELS = {0: 'Informational', 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Critical'}


def main() -> int:
    with open(REPORT_PATH) as f:
        data = json.load(f)

    # Count unique alert types per severity, not URI instances.
    # ZAP's alert-level "count" is the number of affected URIs (e.g. PII Disclosure
    # found on 4 pages → count=4), but we want to report distinct findings:
    # "1 High alert" not "4 High alerts" for the same vulnerability.
    counts = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}
    all_alerts = []
    for site in data.get('site', []):
        for alert in site.get('alerts', []):
            rc = int(alert.get('riskcode', 0))
            counts[rc] = counts.get(rc, 0) + 1
            all_alerts.append(alert)

    print('=' * 40)
    print('ZAP SCAN ALERT SUMMARY')
    print('=' * 40)
    for rc in sorted(counts.keys(), reverse=True):
        if counts[rc] > 0:
            print(f'  {LABELS.get(rc, rc):<15}: {counts[rc]}')
    total = sum(counts.values())
    print(f'  Total alerts    : {total}')
    print('=' * 40)

    top3 = sorted(all_alerts, key=lambda a: int(a.get('riskcode', 0)), reverse=True)[:3]
    top_names = ' | '.join(a.get('name', '?') for a in top3) or 'None'
    print(f'\nTop findings: {top_names}')

    high_count = counts[3] + counts[4]
    print(f'High/Critical alert count: {high_count}')

    github_env = os.environ.get('GITHUB_ENV')
    if github_env:
        with open(github_env, 'a') as f:
            f.write(f'ALERT_HIGH={counts[3]}\n')
            f.write(f'ALERT_MEDIUM={counts[2]}\n')
            f.write(f'ALERT_LOW={counts[1]}\n')
            f.write(f'ALERT_INFO={counts[0]}\n')
            f.write(f'ALERT_TOTAL={total}\n')
            f.write(f'ALERT_TOP={top_names}\n')

    if high_count > 0:
        print(f'\nCRITICAL: {high_count} High-risk alert(s) found — failing job')
        return 1
    print('\nNo critical alerts found')
    return 0


if __name__ == '__main__':
    sys.exit(main())
