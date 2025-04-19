import { createClient } from "./components/utils/supabase/supabase-server";



export default async function sitemap() {

  const supabase = await createClient();

  const modelsRes = await supabase
    .from("Model") 
    .select("id")
    .limit(10000);


  const models = modelsRes.data;

  const datasetsRes = await supabase
    .from("Dataset")
    .select("id")
    .limit(10000);


  const datasets = datasetsRes.data;


  const modelsUrl = models.map(({id})=> {
    return {
        "url": `https://aigacorp.org/view/model/${id}`,
        'lastModified': new Date(),
        'changeFrequency': "daily",
        'priority': 1 
    }
  });


  const datasetsUrl = datasets.map(({id})=> {
    return {
        "url": `https://aigacorp.org/view/dataset/${id}`,
        'lastModified': new Date(),
        'changeFrequency': "daily",
        'priority': 1 
    }
  });



  return modelsUrl.concat(datasetsUrl);
}


 
