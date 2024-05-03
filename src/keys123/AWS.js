

const awsConfig = {
  bucket:process.env.REACT_APP_BUCKET_NAME,
  region:process.env.REACT_APP_AWS_REGION,
  accessKeyId:process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secreteAccessKey:process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
}
console.log(awsConfig)
export default awsConfig;