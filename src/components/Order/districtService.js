import DISTRICTS from './post';

const DEFAULT_DISTRICT_CODE = '100000';

export function getProvinces() {
  return getRegions();
}

export function getCities(provinceCode) {
  return getRegions(provinceCode);
}

export function getDistricts(cityCode) {
  return getRegions(cityCode);
}

export function getRegionByCode(code) {
  for (let x in DISTRICTS) {
    for (let y in DISTRICTS[x]) {
      if (code === y) {
        return DISTRICTS[x][y];
      }
    }
  }
}

export function getCodeByRegion(name) {
  for (let x in DISTRICTS) {
    for (let y in DISTRICTS[x]) {
      if (name === DISTRICTS[x][y]) {
        return y;
      }
    }
  }
}

function getRegions(code = DEFAULT_DISTRICT_CODE) {
  return DISTRICTS[code] || [];
}
