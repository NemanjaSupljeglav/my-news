/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
//React
import React, { useState, useEffect, useRef } from "react";

//CSS
import "./Home.scss";

//Components
import Banner from "./components/Banner";
import SearchImput from "../../components/searchInput/SearchInput";
import { CategoryList } from "./components/CategoryList";
import Icon from "../../components/icon/Icon";

//Services
import { getFunc } from "../../services/mainApiServices";

//Moment
import moment from "moment";

//Interfaces
interface newsData {
  id: number;
  section_name: string;
  headline: {
    main: string;
    print_headline: string;
  };
  byline: {
    original: string;
  };
  favorite: boolean;
}

interface latestData {
  title: string;
  published_date: string;
}

function Home() {
  //State
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<
    | "Home"
    | "World"
    | "Education"
    | "Health"
    | "Science"
    | "Sports"
    | "Technology"
  >("Home");
  const [feedType, setFeedType] = useState<"featured" | "latest">("featured");
  const [search, setSearch] = useState<string>("");
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [news, setNews] = useState<newsData[]>([]);
  const [latestNews, setLatestNews] = useState<latestData[]>([]);
  const [scrollMax, setScrollMax] = useState<number>(40);

  const divRef = useRef<HTMLDivElement>(null);

  //Handlers
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleOpenCategory = () => {
    setCategoryOpen(pre => !pre);
  };

  const handleChangeCategory = data => {
    setCategory(data);
  };

  const handleChangeFeedType = data => {
    setFeedType(data);
  };
  const handleNews = data => {
    setNews(data?.response?.docs);
    console.log(data?.response?.docs, "starta");
  };
  const handleLatestNews = data => {
    setLatestNews([...latestNews, ...data?.results]);
  };
  const handleClick = () => {
    if (search?.length > 2) {
      getFunc(
        `svc/search/v2/articlesearch.json?q=${search}${
          category !== "Home" ? `&fq=section_name:("${category}")` : ""
        }`,
        handleNews
      );
    }
  };

  useEffect(() => {
    getFunc(
      `svc/search/v2/articlesearch.json?q=${search}${
        category !== "Home" ? `&fq=section_name:("${category}")` : ""
      }`,
      handleNews
    );
  }, [category]);
  useEffect(() => {
    getFunc(
      `svc/news/v3/content/all/all.json?offset=${scrollMax}`,
      handleLatestNews
    );
  }, [scrollMax]);
  useEffect(() => {
    if (categoryOpen) setCategoryOpen(false);
  }, [news]);

  window.addEventListener("resize", function () {
    setScreenWidth(window.innerWidth);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!divRef.current) {
        return;
      }
      const element = divRef.current;
      if (
        element.scrollTop + element.offsetHeight >=
        element.scrollHeight - 120
      ) {
        setScrollMax(pri => pri + 20);
        console.log(scrollMax);
      }
    };

    const div = divRef.current;
    div!.addEventListener("scroll", handleScroll);
    return () => {
      div!.removeEventListener("scroll", handleScroll);
    };
  }, [divRef]);

  const handleAddFavorites = data => {
    const newsData = news?.map(item => {
      if (item?.headline?.main === data)
        return { ...item, favorite: !item?.favorite };

      return { ...item, favorite: item?.favorite };
    });
    setNews(newsData);
  };
  return (
    <div className="homeWrapper">
      <Banner />
      <div className="header">
        <div className="mainTitle">
          <div className={categoryOpen ? "myNewsOpen" : "myNews"}>
            <div style={{ color: "#BB1E1E" }}>My</div>
            <div style={{ color: "#1D1D1B" }}>News</div>
          </div>

          {categoryOpen ? (
            <img
              src="/assets/icons/Close.svg"
              alt="Icon"
              className="iconBurger"
              onClick={handleOpenCategory}
            />
          ) : (
            <img
              src="/assets/icons/Burger.svg"
              alt="Icon"
              className="iconBurger"
              onClick={handleOpenCategory}
            />
          )}
        </div>

        <SearchImput
          label="SEARCH"
          placehoder="Search news"
          onChange={handleChange}
          onClick={handleClick}
        />
      </div>
      <div className="line" />
      <div className="switchFeed">
        <button
          className={
            feedType === "featured" ? "switchButtonActive" : "switchButton"
          }
          onClick={() => handleChangeFeedType("featured")}
        >
          Featured
        </button>
        <button
          className={
            feedType === "latest" ? "switchButtonActive" : "switchButton"
          }
          onClick={() => handleChangeFeedType("latest")}
        >
          Latest
        </button>
      </div>
      <div className="feedWrapper">
        <div className={categoryOpen ? "navbar" : "navbarHide"}>
          {CategoryList?.map(item => (
            <button
              key={item?.id}
              onClick={() => handleChangeCategory(item.name)}
              className="categoryButton"
            >
              <Icon
                icon={item?.icon}
                classNameIcon={category === item?.name ? "activeIcon" : "icon"}
                classNameTitle={
                  category === item?.name ? "activeText" : "textButton"
                }
                className={category === item?.name ? "activeIcons" : "icons"}
                title={item?.name}
              />
            </button>
          ))}
        </div>
        {!categoryOpen && (
          <div className="feed">
            <div className="feedTitle">News</div>
            <div className="feedWrapper">
              {(screenWidth > 750 || feedType === "featured") && (
                <div className="postCards">
                  {news?.map((item, index) => (
                    <div className="postCard" key={index}>
                      <img
                        src={`/assets/pictures/${
                          index < 15 ? index + 1 : 5
                        }.png`}
                        alt="My Image"
                        className="postPic"
                      />
                      <div className="titleWrapper">
                        <img
                          src={`/assets/icons/${
                            item?.favorite ? "fullStar" : "star"
                          }.png`}
                          alt="Icon"
                          className="iconFav"
                          onClick={() =>
                            handleAddFavorites(item?.headline?.main)
                          }
                        />
                        <div className="typeTitle">{item?.section_name}</div>
                        <div className="postTitle">{item?.headline?.main}</div>
                        <div className="journalistName">
                          {item?.byline?.original?.slice(0, 50)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {(screenWidth > 750 || feedType === "latest") && (
                <div className="latestNewsWrapper">
                  <div className="newsTitleWrapper">
                    <div className="redPoint" />
                    <div className="newsTitle">Latest news</div>
                  </div>
                  <div className="scrollNewsWrapper" ref={divRef}>
                    {latestNews?.map((item, index) => (
                      <div className="oneNews" key={index}>
                        <div className="time">
                          {moment(item?.published_date).format("LT")}
                        </div>
                        <div className="newsTitle">{item?.title}</div>
                        <div className="newsLine" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {news?.filter(item => item?.favorite).length > 0 && (
        <div className="favoritesWrapper">
          <div className="favoritesNum">
            {news?.filter(item => item?.favorite)?.length}
          </div>
          <img
            src="/assets/icons/folder.png"
            alt="Icon"
            className="favoritesFolder"
            onClick={handleOpenCategory}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
