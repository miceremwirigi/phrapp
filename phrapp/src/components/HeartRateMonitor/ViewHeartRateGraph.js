import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader'; // Ensure this path is correct
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import './ViewHeartRateEntries.css';

Chart.register(...registerables);

const ViewHeartRateGraph = () => {
  const [heartRateEntries, setHeartRateEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchHeartRateEntries = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/mwirigiheartratemonitor`);
        const data = response.data.data; // Access the data field within the response object
        setHeartRateEntries(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching heart rate entries:', error);
        setLoading(false);
      }
    };

    fetchHeartRateEntries();
  }, []);

  useEffect(() => {
    if (!loading && heartRateEntries.length > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: heartRateEntries.map(entry => formatTime(entry.recorded_at)),
          datasets: [{
            label: `${heartRateEntries[0].person.first_name}'s Heart Rate on ${formatDay(heartRateEntries[0].recorded_at)}`,
            data: heartRateEntries.map(entry => entry.heart_rate),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'minute'
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [loading, heartRateEntries]);

  const generatePDF = () => {
    const input = document.getElementById('heart-rate-table');
    const chart = document.getElementById('heartRateChart');
    const personName = heartRateEntries.length > 0 ? heartRateEntries[0].person.first_name : 'heart_rate_entries';

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 20; // Align a tab from the top

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

        html2canvas(chart, { scale: 2 })
          .then((chartCanvas) => {
            const chartImgData = chartCanvas.toDataURL('image/png');
            const chartImgWidth = chartCanvas.width;
            const chartImgHeight = chartCanvas.height;
            const chartRatio = Math.min(pdfWidth / chartImgWidth, pdfHeight / chartImgHeight);
            const chartImgX = (pdfWidth - chartImgWidth * chartRatio) / 2;
            const chartImgY = 20; // Align a tab from the top

            pdf.addPage();
            pdf.addImage(chartImgData, 'PNG', chartImgX, chartImgY, chartImgWidth * chartRatio, chartImgHeight * chartRatio);
            pdf.save(`${personName}_heart_rate_entries.pdf`);
          })
          .catch((error) => {
            console.error('Error generating PDF:', error);
          });
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  if (loading) {
    return <Loader />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString.split(' ')[0]);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString.split(' ')[0]);
    const options = { weekday: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const time = dateString.split(' ')[1];
    const date = new Date(`1970-01-01T${time}Z`);
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div className="heartrate-container">
      <button className="cancel-button" onClick={() => navigate('/')}>X</button>
      <div className="table-wrapper">
        <table id="heart-rate-table" className="heartrate-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Person</th>
              <th>Heart Rate</th>
            </tr>
          </thead>
          <tbody>
            {heartRateEntries.map((entry, index) => (
              <tr key={index}>
                <td>{formatDate(entry.recorded_at)}</td>
                <td>{formatTime(entry.recorded_at)}</td>
                <td>{entry.person.first_name}</td>
                <td>{entry.heart_rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <canvas ref={chartRef} id="heartRateChart"></canvas>
      <div className="button-container">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        <button className="pdf-button" onClick={generatePDF}>Generate PDF</button>
        <button className="add-button" onClick={() => navigate('/add-heart-rate-entry')}>Add</button>
      </div>
    </div>
  );
};

export default ViewHeartRateGraph;