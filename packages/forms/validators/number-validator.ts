export function numberValidator(value: number) {
  if (isNaN(value)) {
    return false;
  }

  return true;
}
