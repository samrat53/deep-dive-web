// import { atom, selector } from "recoil";

// export const networkAtom = atom({
//   key: `networkAtom`,
//   default: 104,
// });

// export const jobsAtom = atom({
//   key: `jobsAtom`,
//   default: 0,
// });
// export const messagingAtom = atom({
//   key: `messagingAtom`,
//   default: 0,
// });
// export const notificationAtom = atom({
//   key: `notificationAtom`,
//   default: 12,
// });
import { atom, selector } from "recoil";

// export const notifications = atom({
//   key: "notifications",
//   default: {
//     network: 0,
//     jobs: 0,
//     messaging: 0,
//     notifications: 0, // corrected spelling here
//   },
// });

export const notifications=atom({
    key:"networkAtom",
    default:selector({
        key:"networkAtomSelector",
        get: async()=>{
            const data=await fetch("https://sum-server.100xdevs.com/notifications");
            return await data.json();
        }
    })
})

export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const count = get(notifications); // corrected variable name here
    return count.network + count.jobs + count.messaging + count.notifications;
  },
});

