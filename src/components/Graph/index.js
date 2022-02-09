import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

export function Graph() {
  
  const [link, setLink] = useState(
    "http://api.coindesk.com/v1/bpi/historical/close.json"
  );
  
  const [dataApi, setDataApi] = useState({
    dia: "valorBitcoin",
  });

  const [chart, setChart] = useState();

  useEffect(() => {
    async function getUser() {
  
      try {
        const result = await axios.get(link);
        console.log(result); 
        setDataApi(result.data.bpi);
      } catch (error) {
        console.error(error); 
      }
    }
   
    getUser();
  }, [link]); 

  console.log(dataApi);
 
  useEffect(() => {
    
    function RenderChart() {
   
      if (chart) {
        chart.destroy();
      }


      const myChart = new Chart(
        document.getElementById("myChart"),
     
        {
          type: "line",
          data: {
            labels: Object.keys(dataApi), 
            datasets: [
              {
                label: "Bitcoin Price", 
                data: Object.values(dataApi), 
              },
            ],
          },
        }
      );
      
      setChart(myChart);
    }

   
    RenderChart();
  }, []);


  return (
    <div>
      <canvas id="myChart"></canvas>{" "}
    </div>
  );
}
