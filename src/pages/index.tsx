import Head from "next/head";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { useSpring, animated } from "react-spring";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { HeartFilledIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useLanguage } from "@/components/LanguageContext";
import LocalizedText from "@/components/LocalizedText";

// import useMeasure from "react-use-measure";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [outputValue, setOutputValue] = useState(0);
  const [open, toggle] = useState(false);
  const [isSurfrHovered, setIsSurfrHovered] = useState(false);
  const [isWooHovered, setIsWooHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { language, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  // const [surfrHeight, setSurfrHeight] = useState(0);
  // const [wooHeight, setWooHeight] = useState(0);
  // const [ref, { height }] = useMeasure();

  const maxInputValue = Math.max(inputValue, outputValue);
  const scaledInputValue = (inputValue / maxInputValue) * 100;
  const scaledOutputValue = (outputValue / maxInputValue) * 100;

  const surfrProps = useSpring({ height: open ? scaledInputValue : 0 });
  const wooProps = useSpring({ height: open ? scaledOutputValue : 0 });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value));
  };

  // useEffect(() => {
  //   setSurfrHeight(outputValue * 0.9 * 32);
  //   setWooHeight(outputValue * 32);
  // }, [inputValue, outputValue]);

  useEffect(() => {
    if (submitted) {
      const output = inputValue * 1.11;
      setOutputValue(output);
    }
  }, [inputValue, submitted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const output = inputValue * 1.11;
    setSubmitted(true);
    setOutputValue(output);
    toggle(!open);
  };

  const key = useMemo(() => Math.random(), []);

  return (
    <>
      <Head>
        <title>Compare Woo vs. Surfr</title>
        <meta name="description" content="compare woo vs. surfr" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#2d5258] to-[#151c2a]">
        <ToggleGroup type="multiple" size="lg" className="">
          <ToggleGroupItem
            aria-label="Theme Toggle"
            className="absolute right-16 top-3 rounded-sm border border-slate-300 bg-transparent text-slate-300"
            onClick={(event) => {
              event.preventDefault();
              setTheme(theme === "light" ? "dark" : "light");
            }}
            value={""}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </ToggleGroupItem>
          <ToggleGroupItem
            aria-label="Language Toggle"
            className="absolute right-4 top-3 rounded-sm border border-slate-300 bg-transparent text-slate-300"
            onClick={toggleLanguage}
            value={""}
          >
            {language === "english" ? "DE" : "EN"}
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="flex max-w-xl items-center justify-center">
          <Card className="relative w-[50vw] min-w-min bg-slate-100 shadow-sm shadow-slate-100 dark:border-slate-400 dark:bg-slate-800 dark:shadow-2xl dark:shadow-slate-800 sm:min-w-[95%]">
            {isMounted && (
              <Popover>
                <PopoverTrigger className="absolute right-6 top-3 size-8 content-center items-center self-end overflow-hidden rounded-md">
                  <Button className="size-8 text-sm dark:bg-slate-400">
                    ?
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="h-60 dark:bg-slate-700">
                  <LocalizedText
                    englishText="The difference is calculated on the basis of"
                    germanText="Die Berechnung erfolgt auf Basis des"
                    className="text-center  text-xs dark:text-slate-50"
                  />
                  <a href="https://www.youtube.com/watch?v=0MIsYVKAruI">
                    <LocalizedText
                      className=" text-center text-xs text-blue-500 underline hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100"
                      germanText=" Videos von SpaceX Kitesurfing"
                      englishText=" this video from SpaceX Kitesurfing"
                    />
                  </a>
                  <LocalizedText englishText="." germanText="." />
                  <AspectRatio ratio={16 / 12} className="h-40 w-full pt-4">
                    <Image
                      className="h-full w-full object-cover"
                      src={"/compare_table.jpg"}
                      alt={"Table from the Video that compares the two"}
                      width={200}
                      height={112}
                    />
                  </AspectRatio>
                </PopoverContent>
              </Popover>
            )}
            <CardHeader className="flex max-w-[90%] items-start justify-start pt-4">
              <CardTitle>
                <LocalizedText
                  className="text-l"
                  englishText="Find out, how high you would have woosted!"
                  germanText="Wie hoch wäre ich auf Woo gesprungen?"
                />
              </CardTitle>
              <CardDescription className="text-md">
                <LocalizedText
                  englishText="Enter your jump height and press enter to compare the results."
                  germanText="Gib deine Sprunghöhe ein und drücke Enter, um die Ergebnisse zu vergleichen."
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex w-full flex-wrap items-center gap-4">
                  <div className="flex-1 space-y-1.5">
                    <Input
                      type="number"
                      className="h-[50px] min-w-44 bg-slate-50 text-center text-xl dark:bg-slate-400 dark:text-slate-50"
                      autoFocus
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <Button
                      className="h-[50px] w-full"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={submitted}
                    >
                      <LocalizedText
                        className="text-lg"
                        englishText="Calculate"
                        germanText="Berechnen"
                      />
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
            {submitted ? (
              <>
                <Separator className="dark:bg-slate-400" />
                <CardFooter
                  className="flex h-full items-center justify-evenly gap-x-24 py-4 transition-all duration-200 lg:px-32"
                  key={key}
                >
                  <div
                    className="hover:scale-102 relative h-80 w-20 transform cursor-pointer rounded transition-all duration-200"
                    onMouseEnter={() => setIsSurfrHovered(true)}
                    onMouseLeave={() => setIsSurfrHovered(false)}
                  >
                    <animated.div
                      className="absolute bottom-0 left-0 h-full w-full rounded bg-[#00bcd7]"
                      style={{
                        height: surfrProps.height.to((h) => `${h}%`),
                        boxShadow: isSurfrHovered
                          ? "0 0 10px 5px rgba(0, 188, 215, 0.3)"
                          : "none",
                      }}
                    />
                    <animated.div className="absolute bottom-0 left-0 flex h-full w-full items-center justify-center rounded text-slate-50">
                      {inputValue.toFixed(2)}
                    </animated.div>
                    <p className="absolute bottom-0 w-full text-center text-slate-50">
                      Surfr
                    </p>
                  </div>
                  <div
                    className="hover:scale-102 relative h-80 w-20 transform cursor-pointer rounded transition-all duration-200"
                    onMouseEnter={() => setIsWooHovered(true)}
                    onMouseLeave={() => setIsWooHovered(false)}
                  >
                    <animated.div
                      className="absolute bottom-0 left-0 h-full w-full rounded bg-[#00aeff]"
                      style={{
                        height: wooProps.height.to((h) => `${h}%`),
                        boxShadow: isWooHovered
                          ? "0 0 10px 5px rgba(0, 174, 255, 0.3)"
                          : "none",
                      }}
                    />
                    <animated.div className="absolute bottom-0 left-0 flex h-full w-full items-center justify-center rounded text-slate-50">
                      {outputValue.toFixed(2)}
                    </animated.div>
                    <p className="absolute bottom-0 w-full text-center text-slate-50">
                      Woo
                    </p>
                  </div>
                </CardFooter>
              </>
            ) : null}
          </Card>
        </div>
        <span className="absolute bottom-2 right-3 flex content-baseline items-end text-white">
          Built with{" "}
          <HeartFilledIcon className="mx-2 self-center text-red-600" /> by{" "}
          <a href="https://github.com/Heahl" className="ml-1 underline">
            {" "}
            heahl
          </a>
        </span>
      </main>
    </>
  );
}
