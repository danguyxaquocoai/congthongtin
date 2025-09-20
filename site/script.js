// Lấy member_id từ URL
function getMemberIdFromUrl() {
  const match = window.location.pathname.match(/members\/(\w+)/);
  return match ? match[1] : null;
}


function getRepoPrefix() {
  // Nếu chạy trên GitHub Pages repo congthongtin thì prefix là /congthongtin
  if (window.location.hostname.endsWith('github.io')) {
    return '/congthongtin';
  }
  return '';
}

function getDataPrefix() {
  return getRepoPrefix() + '/data/members/';
}

async function fetchMemberData(memberId) {
  try {
    const prefix = getDataPrefix();
    const res = await fetch(`${prefix}${memberId}/info.json`);
    if (!res.ok) throw new Error('Không tìm thấy dữ liệu thành viên');
    return await res.json();
  } catch (e) {
    return null;
  }
}

function renderMemberCard(data, memberId) {
  const repoPrefix = getRepoPrefix();
  const logoUrl = repoPrefix + '/data/card/logo.jpg';
  const avatarUrl = repoPrefix + `/data/members/${memberId}/avatar.jpg`;
  const defAvatar = repoPrefix + '/data/card/def-avatar.png';
  const fields = [
    { label: 'Số thẻ', key: 'card_number' },
    { label: 'Họ và tên', key: 'full_name' },
    { label: 'Ngày sinh', key: 'birth_date' },
    { label: 'Giới tính', key: 'gender' },
    { label: 'CCCD', key: 'citizen_id' },
    { label: 'Tổ chức', key: 'organization' },
    { label: 'Phòng ban', key: 'department' },
    { label: 'Chức vụ', key: 'position' }
  ];
  return `
    <div class="card card-member mx-auto mt-4 p-3">
      <img src="${logoUrl}" class="card-logo" alt="Logo">
      <div class="card-title">${data.title || ''}</div>
      <div class="d-flex flex-column align-items-center">
        <img src="${avatarUrl}" class="card-avatar" alt="Avatar" data-fallback="${defAvatar}" onerror="if(this.src!==this.getAttribute('data-fallback')){this.src=this.getAttribute('data-fallback');}">
      </div>
      <div class="mt-2">
        ${fields.map(f => `
          <div class="card-label">${f.label}</div>
          <div class="card-value">${data[f.key] || ''}</div>
        `).join('')}
      </div>
    </div>
  `;
}

async function main() {
  const memberId = getMemberIdFromUrl();
  const container = document.getElementById('member-card-container');
  if (!memberId) {
    container.innerHTML = '<div class="alert alert-danger">Không tìm thấy thành viên.</div>';
    return;
  }
  const data = await fetchMemberData(memberId);
  if (!data) {
    container.innerHTML = '<div class="alert alert-warning">Không tìm thấy dữ liệu thành viên.</div>';
    return;
  }
  container.innerHTML = renderMemberCard(data, memberId);
}

main();
