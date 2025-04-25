/** @type {import('next').NextConfig} */

const nextConfig = {

  env: {
    "SUPABASE_URL": process.env.SUPABASE_URL,
    "SUPABASE_ANON_KEY":  process.env.SUPABASE_ANON_KEY,
  },
  
  compiler: {
    styledComponents: true,
  },

   webpack: (config) => {

        config.resolve.alias = {
            ...config.resolve.alias,
            "sharp$": false,
            "onnxruntime-node$": false,
        }

        return config;
    },

};



export default nextConfig;
