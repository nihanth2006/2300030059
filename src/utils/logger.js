export const Log = async (level, pkg, message) => {
  try {
    await fetch(
      "http://4.224.186.213/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stack: "frontend",
          level,
          package: pkg,
          message,
        }),
      }
    );
  } catch (error) {
    console.error(error);
  }
};

