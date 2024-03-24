import "./App.css";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { notifications, totalNotificationSelector } from "./store/atoms";
import { useEffect } from "react";
import AtomFamily from "./AtomFamily";
import SelectorFamily from "./SelectorFamily";
// import {
//   jobsAtom,
//   messagingAtom,
//   networkAtom,
//   notificationAtom,
//   totalNotificationSelector,
// } from "./store/atoms";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
      <AtomFamily/>
      <SelectorFamily/>
    </RecoilRoot>
  );
}
const MainApp = () => {
  // const networkCount = useRecoilValue(networkAtom);
  // const jobsCount = useRecoilValue(jobsAtom);
  // const notificatonCount = useRecoilValue(notificationAtom);
  // const [messageCount, setMessagingCount] = useRecoilState(messagingAtom);
  // const messageCount = useRecoilValue(messagingAtom);
  // const setMessageCount = useSetRecoilState(messagingAtom);
  // const totalNotficationCount=useRecoilValue(totalNotificationSelector);

  // Asynchronous data quesries using recoil

  const [networkCount, setNetworkCount] = useRecoilState(notifications);
  const totalNotficationCount = useRecoilValue(totalNotificationSelector);

  return (
    <>
      <button>Home</button>
      <button>
        My Network ({networkCount.network >= 100 ? `99+` : networkCount.network}
        )
      </button>
      <button>Jobs ({networkCount.jobs})</button>
      <button>Messaging ({networkCount.messaging})</button>
      <button>Notifications ({networkCount.notifications})</button>
      {/* <button onClick={() => setMessageCount((prev) => prev + 1)}>
        Inc message count ME
      </button> */}
      <button>Me ({totalNotficationCount})</button>
      <h2>Total notfications={totalNotficationCount}</h2>
    </>
  );
};

export default App;
