const itemsPerPage = 20;

function getCompanyId(path) {
  const match = path.match(/\/public\/([^/]+)\/company_info\.json/);
  return match ? match[1] : null;
}

function getRecord(moduleValue) {
  return moduleValue.default || moduleValue;
}

export function loadAikData() {
  const companyInfoFiles = import.meta.glob("/public/*/company_info.json", {
    eager: true
  });
  const aikFiles = import.meta.glob("/public/*/aik.json", { eager: true });
  // IMPORTANT: use `?url` so Vite doesn't bundle and apply these CSS files globally.
  // We only need to detect existence.
  const styleFiles = import.meta.glob("/public/*/style.css", {
    query: "?url",
    import: "default"
  });

  const companyIds = Object.keys(companyInfoFiles)
    .map(getCompanyId)
    .filter(Boolean);

  const records = [];

  for (const companyId of companyIds) {
    const companyInfoKey = `/public/${companyId}/company_info.json`;
    const aikKey = `/public/${companyId}/aik.json`;
    const styleKey = `/public/${companyId}/style.css`;

    if (!companyInfoFiles[companyInfoKey] || !aikFiles[aikKey]) {
      continue;
    }

    const companyInfo = getRecord(companyInfoFiles[companyInfoKey]);
    const aikData = getRecord(aikFiles[aikKey]);
    const totalPages = Math.ceil(aikData.length / itemsPerPage);
    const hasStyleCss = Boolean(styleFiles[styleKey]);

    records.push({
      companyId,
      companyInfo,
      aikData,
      totalPages,
      itemsPerPage,
      hasStyleCss
    });
  }

  return records;
}
