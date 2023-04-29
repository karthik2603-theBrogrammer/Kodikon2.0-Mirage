import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ERP() {
  const url = "https://mirageinventorybackend.vercel.app";
  const resetDB = async () => {
    setShowChart(false)
    toast.info(`Clearing and Resetting DB... `, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    await axios.get(url + "/cleardb").then(() => {
      toast.success(`Successfully Cleared And Reset The DB! `, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Cleared The Database!");
    }).catch((err) => {
      toast.error(`Error Refreshing The DB!`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
    await axios.get(url + "/make").then(() => {
      console.log("Ready - Database!");
    });
  };
  const [count, setCount] = useState(0);
  const [gettingChart, setGettingChart] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState(null);

  const date = [];
  const stock = [];
  const sales = [];
  //data from backend
  const [d, setD] = useState(null);

  const handleInc = () => {
    setCount(count + 1);
  };
  const handleDec = () => {
    setCount(count - 1);
  };
  const handleSendBackend = () => {
    console.log("sending", count);
    setShowChart(false)
    toast.info(`Buying ${count} `, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setCount(0);
    console.log(Date.now());
    const time = Date.now();
    axios
      .post("http://localhost:4000/todatabase", {
        sending: count,
        time: time,
      })
      .then((res) => {
        console.log(res?.data);
        toast.success(`Bought ${count} `, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err} `, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  const handleChart = () => {
    setShowChart(false);
    setGettingChart(true);
    axios
      .get("http://localhost:4000/chartdata")
      .then((res) => {
        console.log(res?.data);
        setChartData(res?.data);
        for (var i = 0; i < res?.data.length; i++) {
          date.push(res?.data[i]?.time);
          stock.push(res?.data[i]?.stock);
          sales.push(res?.data[i]?.quantity);
        }
        setGettingChart(false);
        setShowChart(true);
        console.log(date, stock);
      })
      .catch((err) => console.log(err));
  };
  const data = {
    labels: chartData?.map((ele) => new Date(ele.time).toLocaleTimeString()),
    datasets: [
      {
        label: "Time vs Stock Graph",
        data: chartData?.map((ele) => ele.stock),
        fill: false,
        backgroundColor: "#ffffff",
        borderColor: "#0062ff",
      },
    ],
  };
  const options = {
    scales: {
      y: {
        min: 0,
        max: 25,
        stepSize: 5,
      },
      x: {
        min: 0,
        max: 1677360319734,
        stepSize: 1677360,
      },
    },
  };

  const data2 = {
    labels: chartData?.map((ele) => new Date(ele.time).toLocaleTimeString()),
    datasets: [
      {
        label: "Time vs Purchase Graph",
        data: chartData?.map((ele) => ele.quantity),
        fill: true,
        backgroundColor: "#9b9b9b",
        borderColor: "#0071bd",
      },
    ],
  };
  const options2 = {
    scales: {
      y: {
        min: 0,
        max: 25,
        stepSize: 5,
      },
      x: {
        min: 0,
        max: 1677360319734,
        stepSize: 1677360,
      },
    },
  };

  return (
    <>
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl self-center m-[22px]">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          We Are
        </span>{" "}
        Mirage.
      </h1>
      <div className="bg-gradient-to-t from-emerald-600  to-sky-400 p-5 m-1 flex flex-col justify-center rounded-md">
        <div className="border-solid border-2 border-sky-600 m-4 p-4 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-6xl text-white self-center m-4">
            lonovo Yoga Slim 7i Pro 12th Gen (14, Intel)
          </h1>
          <img
            src="data:image/jpeg;base64,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"
            alt="NA"
            className="h-[200px] w-[200px] relative m-[22px] rounded-md bg-transparent"
          />
          <div className="w-[100%] flex items-center justify-center">
            <button
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-6 py-2 mr-2 mb-2 dark:bg-gray-800  dark:focus:ring-gray-700 dark:border-gray-700 hover:scale-90 transition ease-in"
              onClick={handleInc}
            >
              +
            </button>
            <button
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-6 py-2 mr-2 mb-2 dark:bg-gray-800  dark:focus:ring-gray-700 dark:border-gray-700 hover:scale-90 transition ease-in"
              onClick={handleDec}
            >
              -
            </button>
            <button
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-6 py-2 mr-2 mb-2 dark:bg-gray-800  dark:focus:ring-gray-700 dark:border-gray-700 hover:scale-90 transition ease-in"
              onClick={resetDB}
            >
              Cl
            </button>
          </div>
          <div className="flex items-center text-3xl justify-center self-center flex-col text-white mb-2 text-bold font-serif">
            {count}
            <p>Price: 1,20,000</p>
            <button
              onClick={handleSendBackend}
              className="text-white mt-4  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-6 py-2 mr-2 mb-2 dark:bg-gray-800  dark:focus:ring-gray-700 dark:border-gray-700 hover:scale-90 transition ease-in"
            >
              BUY
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-gradient-to-b from-emerald-600  to-sky-400 p-5 m-5 flex flex-row justify-center rounded-md">
          <button
            onClick={handleChart}
            className="text-white mb-4 text-3xl font-extrabold dark:text-white md:text-5xl lg:text-6xl"
          >
            GET CHART DATA
          </button>
        </div>
      </div>
      {gettingChart && (
        <div className="text-white font-semibold text-2xl">Loading...</div>
      )}
      {showChart && (
        <div className="h-[60vh] flex flex-col justify-center items-center md:pt-[190px]">
          <Line data={data} options={options} color="white" />
          <Line data={data2} options={options2} />
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default ERP;
