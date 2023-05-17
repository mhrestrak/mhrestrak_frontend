export function level1Access(user) {
  if (
    user.isHouseManager ||
    user.isIntakeCoordinator ||
    user.isCaseCoordinator ||
    user.isCenterCoordinator ||
    user.isAdmin
  ) {
    return true;
  }
  return false;
}

export function level2Access(user) {
  if (
    user.isIntakeCoordinator ||
    user.isCaseCoordinator ||
    user.isCenterCoordinator ||
    user.isAdmin
  ) {
    return true;
  }
  return false;
}

export function level3Access(user) {
  if (user.isCaseCoordinator || user.isCenterCoordinator || user.isAdmin) {
    return true;
  }
  return false;
}

export function level4Access(user) {
  if (user.isCenterCoordinator || user.isAdmin) {
    return true;
  }
  return false;
}

export function level5Access(user) {
  if (user.isAdmin) {
    return true;
  }
  return false;
}
