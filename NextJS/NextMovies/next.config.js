//.env 파일에 API_KEY를 적어주고,
// gitignore에 넣어줌.
const API_KEY = process.env.API_KEY;

module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        //source: 유저가 이 url로 향한다면
        //:path* : 그 뒤의 아무거나.. *로 인해 모든걸 catch할 수 있음(/ 여러개)
        source: "/old-blog/:path*",
        // destination: 이 url로 향하도록 한다
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
    ];
  },
  //My API Key를 숨기기 위함
  async rewrites() {
    return [
      {
        // fetch 주소 변경: 가짜 fetch URL
        // source 로 접근했을 때
        source: "/api/movies",
        // destination 로 접근하지만, 이를 표시하지는 않고 source 그대로 표시됨.
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};
