const api = "https://api.untappd.com/v4/user/beers";
const user = "seeila";
const client_id = "0EA22DB517F8236B59C8E2CC5884789D3240D5D2";
const client_secret = "BCB22A2739CAC50711B0852E5CD4D8122A4B2026";
const limit = 50;

export const getAllBeers = () => {
   let beers = [];
   let fetches = []

   for(let i=0; i < 150; i+=50) {
      fetches.push(
         fetch(`${api}/${user}?client_id=${client_id}&client_secret=${client_secret}&limit=${limit}&offset=${i}`).then(response => {
            return response.json();
         }).then(response => {
            beers.push(...response.response.beers.items);
            return beers;
         }).catch((status) => console.log(status))
      )
   }

   return Promise.all(fetches);
}
