export function animateNumber(refValue, target, duration = 600) {
  const start = refValue.value;
  const distance = target - start;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    refValue.value = Math.floor(start + distance * progress);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
