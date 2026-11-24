import urllib.request
import urllib.error
import json

base_url = 'http://localhost:3000'

print('=== TEST 1: Homepage GET ===')
req = urllib.request.Request(base_url)
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8')
    assert resp.status == 200, f'Status {resp.status}'
    assert 'National Symposium on Quantum Computing' in html
    assert '28–29 December 2026' in html
    assert "Vignan's" in html or "VIGNAN" in html
    print('  [PASS] Homepage returned 200 OK with correct dates and university identity.')

print('=== TEST 2: Registration POST ===')
new_reg_data = {
    'fullName': 'Dr. Ramanujan Srinivasan',
    'email': 'ramanujan.s@quantum-lab.org',
    'mobileNumber': '+91 98765 43210',
    'institution': 'Centre for Quantum Technologies',
    'department': 'Department of Quantum Information Theory',
    'designation': 'Scientist / R&D Researcher',
    'category': 'Faculty Members',
    'cityState': 'Hyderabad, Telangana',
    'areasOfInterest': 'Quantum Algorithms, Hamiltonian Simulation, QEC'
}
reg_req = urllib.request.Request(
    f'{base_url}/api/register',
    data=json.dumps(new_reg_data).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)
with urllib.request.urlopen(reg_req) as resp:
    reg_res = json.loads(resp.read().decode('utf-8'))
    assert resp.status == 201
    assert 'registration' in reg_res
    reg_id = reg_res['registration']['registrationId']
    assert reg_id.startswith('NSQC-2026-')
    print(f'  [PASS] Registration succeeded with Unique ID: {reg_id}')

print('=== TEST 3: Duplicate Registration Check ===')
try:
    with urllib.request.urlopen(reg_req) as resp:
        print('  [FAIL] Expected duplicate error, but succeeded.')
except urllib.error.HTTPError as e:
    assert e.code == 409
    body = json.loads(e.read().decode('utf-8'))
    assert 'already registered' in body['error']
    print('  [PASS] Duplicate registration rejected with HTTP 409 Conflict: ' + body['error'][:60] + '...')

print('=== TEST 4: Admin Login & Protected Data ===')
admin_login_req = urllib.request.Request(
    f'{base_url}/api/admin/login',
    data=json.dumps({'password': 'quantum2026admin'}).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)
with urllib.request.urlopen(admin_login_req) as resp:
    assert resp.status == 200
    cookies = resp.headers.get('Set-Cookie')
    assert 'nsqc_admin_auth' in cookies
    print('  [PASS] Admin authenticated, session cookie issued.')

# Fetch admin registrations using cookie
admin_data_req = urllib.request.Request(
    f'{base_url}/api/admin/registrations',
    headers={'Cookie': cookies.split(';')[0]}
)
with urllib.request.urlopen(admin_data_req) as resp:
    assert resp.status == 200
    admin_data = json.loads(resp.read().decode('utf-8'))
    assert 'registrations' in admin_data
    assert 'stats' in admin_data
    print(f'  [PASS] Admin data retrieved: {len(admin_data["registrations"])} registrations, total in stats: {admin_data["stats"]["totalRegistrations"]}.')

print('=== TEST 5: CSV Export Endpoint ===')
export_req = urllib.request.Request(
    f'{base_url}/api/admin/export',
    headers={'Cookie': cookies.split(';')[0]}
)
with urllib.request.urlopen(export_req) as resp:
    assert resp.status == 200
    csv_text = resp.read().decode('utf-8')
    assert 'Registration ID,Full Name,Email' in csv_text
    assert 'Ramanujan' in csv_text
    print(f'  [PASS] CSV export generated with headers and delegate records ({len(csv_text)} bytes).')

print('\nALL AUTOMATED TESTS PASSED WITH 100% SUCCESS!')
