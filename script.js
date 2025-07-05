const API_KEY = "df05c590c87a4dad9ea145849250107";

const cityBackgrounds = {
  delhi: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXzwrGG67w71pWxziiaLE5543b9396CgBnDg&s",
  paris: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2014/03/25/12/eiffel.jpg?width=1200",
  agra: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
  london: "https://media.gettyimages.com/id/sb10066993a-002/photo/london-montage-against-plain-blue-sky-with-river-thames-in-foreground.jpg?s=612x612&w=gi&k=20&c=QRxGeme4StQRKgxVgvLtsZz7lhzgzRLZ6NbcGIHGtac=",
  tokyo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4vaBCRADlEadSDL4r9Fvlltdj0tPgf1iRjA&s",
  bangalore: "https://assets-news.housing.com/news/wp-content/uploads/2020/12/01163300/Bengaluru%E2%80%99s-Vidhana-Soudha-could-be-worth-over-Rs-3900-crores-FB-1200x700-compressed.jpg",
  hyderabad: "https://s7ap1.scene7.com/is/image/incredibleindia/charminar-hyderabad-2-attr-hero?qlt=82&ts=1726652869975",
  mumbai: "https://assets.simplotel.com/simplotel/image/upload/x_0,y_1208,w_3492,h_1968,r_0,c_crop,q_80,fl_progressive/w_500,f_auto,c_fit/theory9---premium-service-apts/mumbai_gateway_of_india",
  sydney: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsr6rq9WnJ4lfMkled5gNTN_ZPyemZ_p2BKg&s",
  rome: "https://cdn.mos.cms.futurecdn.net/BiNbcY5fXy9Lra47jqHKGK.jpg",
  dubai: "https://i.pinimg.com/736x/f6/91/4d/f6914d2f08780889ea49b80e4308de80.jpg",
  default: "https://thumbs.dreamstime.com/b/fall-colors-road-michigan-beautiful-random-upper-peninsula-95173443.jpg"
};

$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get("city")?.toLowerCase();

  if (city) {
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    $.get(apiURL, function (data) {
      const html = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p><strong>🌡 Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>💧 Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>🌬 Wind Speed:</strong> ${data.current.wind_kph} kph</p>
        <p><strong>🌤 Condition:</strong> ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
      `;
      $("#weatherResult").html(html);

      const bgUrl = cityBackgrounds[city] || cityBackgrounds.default;
      const $bg = $("#bgLayer");

      // Background fade-in
      $bg.removeClass("active"); // Reset animation class
      $bg.css("background-image", `url("${bgUrl}")`);
      setTimeout(() => $bg.addClass("active"), 100);
    }).fail(function () {
      $("#weatherResult").html("<p>❌ City not found or invalid API key.</p>");
    });
  }
});
