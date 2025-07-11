const withRetry = async (fn, maxAttempts = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxAttempts) throw err;

      console.warn(`Retrying (${attempt}/${maxAttempts}) due to error:`, err.message);
      await new Promise((res) => setTimeout(res, delay * attempt)); // exponential backoff
    }
  }
};

module.exports = withRetry;
