// 1. fetchUser(userId) — повертає користувача через 2 секунди
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) {
        return reject(new Error("Invalid userId"));
      }

      const user = { id: userId, name: "John Doe" };
      console.log("User fetched:", user);
      resolve(user);
    }, 2000);
  });
}

// 2. fetchOrders(userId) — чекає fetchUser, потім повертає orders через 3 секунди
function fetchOrders(userId) {
  return fetchUser(userId)
    .then(user => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!user) {
            return reject(new Error("User not found"));
          }

          const orders = [
            { id: 1, item: "Laptop" },
            { id: 2, item: "Phone" }
          ];

          console.log("Orders fetched for user:", user.id);
          resolve(orders);
        }, 3000);
      });
    })
    .catch(error => {
      console.error("Error in fetchOrders:", error.message);
      throw error;
    });
}

// 3. async функція getUserWithOrders(userId)
async function getUserWithOrders(userId) {
  try {
    const user = await fetchUser(userId);
    const orders = await fetchOrders(userId);

    console.log("Final result:");
    console.log("User:", user);
    console.log("Orders:", orders);
  } catch (error) {
    console.error("Error in getUserWithOrders:", error.message);
  }
}

// Підключення до кнопки в HTML
document.getElementById("loadBtn").addEventListener("click", () => {
  getUserWithOrders(1); // Спробуй змінити на null, щоб побачити помилку
});