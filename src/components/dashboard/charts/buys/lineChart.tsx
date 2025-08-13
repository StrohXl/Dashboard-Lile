"use client";
import { DataBuyType } from "@/app/api/buys/type";
import {
  AreaSeries,
  createChart,
  ColorType,
  PriceScaleMode,
} from "lightweight-charts";
import { useEffect, useRef, use } from "react";
import { arrayDates } from "../utils";

type DataType = {
  time: string;
  value: number;
};
export const ChartComponent = (props: {
  data: DataType[];
  colors?: {
    backgroundColor: string;
    lineColor: string;
    textColor: string;
    areaTopColor: string;
    areaBottomColor: string;
  };
  resData: Promise<DataBuyType>;
}) => {
  const resData = use(props.resData);
  const { montDate, weekDate } = arrayDates(resData);
  console.log(weekDate, montDate);
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#a4327e",
      textColor = "#555",
      areaTopColor = "#a4327e",
      areaBottomColor = "#df87ccaa",
    } = {},
  } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return; //
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      crosshair: {
        // hide the horizontal crosshair line
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        // hide the vertical crosshair label
        vertLine: {
          labelVisible: false,
        },
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      leftPriceScale: {
        borderColor: "transparent",
        scaleMargins: {
          top: 0.3,
          bottom: 0,
        },
        entireTextOnly: true,
        visible: true,
        autoScale: false,
        ticksVisible: true,
        minimumWidth: 65,
      },
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        borderVisible: false,
        minimumHeight: 40,
      },

      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    chart.timeScale().fitContent();

    const newSeries = chart.addSeries(AreaSeries, {
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
      lineWidth: 2,
    });

    newSeries.setData(data);

    const container = document.getElementById(
      "containerLineChart"
    ) as HTMLElement;
    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;
    const toolTip = document.createElement("div");
    toolTip.style = `width: 130px; height: 65px; position: absolute; display: none; padding: 8px 14px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
    toolTip.style.background = "#333";
    toolTip.style.color = "white";
    toolTip.style.borderRadius = "10px";
    toolTip.style.borderColor = "#222";
    container?.appendChild(toolTip);

    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        toolTip.style.display = "none";
      } else {
        // time will be in the same format that we supplied to setData.
        // thus it will be YYYY-MM-DD
        const dateStr = param.time;
        toolTip.style.display = "block";
        const data = param.seriesData.get(newSeries);
        const price = data?.value !== undefined ? data.value : data.close;
        toolTip.innerHTML = `<div style="color: ${"#2962FF"}"><div style="font-size: 16px; margin-bottom: 4px; color: ${"white"}">
           Productos  ${Math.round(100 * price) / 100}
            </div><div style="color: ${"white"}">
            ${dateStr}
            </div>`;

        const y = param.point.y;
        let left = param.point.x + toolTipMargin + 190;
        if (left > container.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth + 300;
        }

        let top = y + toolTipMargin + 40;
        if (top > container.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin + 150;
        }
        toolTip.style.left = left + "px";
        toolTip.style.top = top + "px";
      }
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return (
    <div
      className="rounded-xl overflow-hidden shadow-xl"
      id="containerLineChart"
      ref={chartContainerRef}
    />
  );
};
