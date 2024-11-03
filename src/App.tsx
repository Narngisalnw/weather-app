import { useState } from "react"

function App() {

  const [form, setForm] = useState("");
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: any,) {
    e.preventDefault()
    if (form != "") {
      searchWeather(form)
    }
  }

  async function searchWeather(city: String) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_SOME_KEY}`
      );
      if (!response.ok) {
        throw new Error("City not found or API error");
      }
      const data = await response.json();
      setPostData(data);
      setError("");
    } catch (err) {
      setError("Invalid location! Please try again.");
      setPostData(null);
    }
  }

  const flagUrl = postData ? `https://flagsapi.com/${postData["sys"]["country"]}/flat/64.png` : "";
  const tempUrl = postData ? `https://openweathermap.com/img/wn/${postData["weather"][0]["icon"]}@4x.png` : "";

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg bg-gray-300">
        <form onSubmit={handleSubmit} className="flex justify-around items-center text-gray-900 gap-4 p-3">
          <i className="fa-solid fa-location-dot"></i>
          <input
            type='text'
            onChange={e => setForm(e.target.value)}
            placeholder='Search...'
            className="p-3 w-full rounded-full"
          />
          <button type="submit" className="text-black font-bold cursor-pointer p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
          </button>
        </form>

        {error && (
            <div>
              <p className="text-red-500 text-center font-semibold mt-4">{error}</p>
            </div>
          )
        }

        { postData && (

            <section className="text-black">
              <figure className="flex justify-center items-center gap-4 px-3 text-xl">
                <figcaption>{postData["name"]} {postData["sys"]["country"]}</figcaption>
                <img src={flagUrl} alt="" />
              </figure>
              <figure>
                <figcaption className="flex justify-center items-center">
                  <img src={tempUrl} alt="" />
                </figcaption>
              </figure>
              <div className="grid grid-flow-row gap-1">
                <div className="text-center text-2xl">
                  <span>{postData["main"]["temp"]}</span>
                  <sup>o</sup>
                  <span>C</span>
                </div>
                <div className="text-center text-lg">
                  <span>{postData["weather"][0]["description"]}</span>
                </div>
              </div>
                
              <div className="flex justify-around items-center mt-4 gap-3">
                <div className="text-center grid grid-flow-row gap-1">
                  <i className="fa-solid fa-cloud"></i>
                  <span>Clouds</span>
                  <span>{postData["clouds"]["all"]}%</span>
                </div>
                <div className="text-center grid grid-flow-row gap-1">
                  <i className="fa-solid fa-water"></i>
                  <span>Humidity</span>
                  <span>{postData["main"]["humidity"]}%</span>
                </div>
                <div className="text-center grid grid-flow-row gap-1">
                  <i className="fa-solid fa-wind"></i>
                  <span>Wind Speed</span>
                  <span>{postData["wind"]["speed"]} Km/h</span>
                </div>
                <div className="text-center grid grid-flow-row gap-1">
                  <i className="fa-solid fa-gauge"></i>
                  <span>Pressure</span>
                  <span>{postData["main"]["pressure"]} hPa</span>
                </div>
              </div>
            </section>
          )
        }

      </div>
    </div>
  )
}

export default App