
export function fetchNearbyRestaurants() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "r1",
          name: "The Spice Route",
          description: "Contemporary Indian cuisine",
          image:
            "https://plus.unsplash.com/premium_photo-1666174933753-36abe3cb834b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=689",
          distance: "400m"
        },
        {
          id: "r2",
          name: "Blue Harbor",
          description: "Seafood & coastal flavors",
          image:
            "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1123",
          distance: "1.2km"
        },
        {
          id: "r3",
          name: "Bean & Barrel",
          description: "Coffee and light bites",
          image:
            "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80",
          distance: "650m"
        }
      ]);
    }, 600);
  });
}
