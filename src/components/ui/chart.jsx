import * from "react";
import * from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME }
const THEMES = { light: "", dark: ".dark" };

export type ChartConfig = {
  [k in string]: {
    label ReactNode;
    icon ComponentType;
  } & ({ color; theme } | { color; theme , string> });
};

type ChartContextProps = {
  config;
};

const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React. & {
    config;
    children ["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id |.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]-border/50 [&_.recharts-curve.recharts-tooltip-cursor]-border [&_.recharts-dot[stroke='#fff']]-transparent [&_.recharts-layer]-none [&_.recharts-polar-grid_[stroke='#ccc']]-border [&_.recharts-radial-bar-background-sector]-muted [&_.recharts-rectangle.recharts-tooltip-cursor]-muted [&_.recharts-reference-line_[stroke='#ccc']]-border [&_.recharts-sector[stroke='#fff']]-transparent [&_.recharts-sector]-none [&_.recharts-surface]-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id; config }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme |.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme.[theme .theme] |.color;
    return color  `  --color-${key}: ${color};` ;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React. . & {
      hideLabel;
      hideIndicator;
      indicator: "line" | "dot" | "dashed";
      nameKey;
      labelKey;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey |.dataKey |.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey &&  === "string"
           config[label ].label |
          .label;

      if (labelFormatter) {
        return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>;
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload.length) {
      return null;
    }

    const nestLabel = payload.length === 1 & !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel  tooltipLabel }
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey |.name |.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color |.payload.fill |.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter &.value !== undefined &.name  (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig.icon  (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                            "h-2.5 w-2.5" === "dot",
                            "w-1" === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent" === "dashed",
                            "my-0.5" & === "dashed",
                          })}
                          style={
                            {
                              "--color-bg",
                              "--color-border",
                            }.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel  "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel  tooltipLabel }
                        <span className="text-muted-foreground">{itemConfig.label |.name}</span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React. <RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon;
      nameKey;
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();

  if (!payload.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top"  "pb-3" : "pt-3", className)}
    >
      {payload.map((item) => {
        const key = `${nameKey |.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]-muted-foreground")}
          >
            {itemConfig.icon && !hideIcon  (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor.color,
                }}
              />
            )}
            {itemConfig.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config, payload, key) {
  if ( !== "object" | === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && .payload === "object" &.payload !== null
       payload.payload
      ;

  let configLabelKey = key;

  if (key in payload && [key ] === "string") {
    configLabelKey = payload[key ];
  } else if (
    payloadPayload & in payloadPayload &&
    [key ] === "string"
  ) {
    configLabelKey = payloadPayload[key ];
  }

  return configLabelKey in config  config[configLabelKey] ];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };

