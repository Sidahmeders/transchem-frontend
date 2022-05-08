export default () => (
  <>
  <h1>An API access token is required to use Mapbox GL</h1>
  <p>1) See: {" "}
    <a target='_blank' href='https://www.mapbox.com/api-documentation/#access-tokens-and-token-scopes'>
      https://www.mapbox.com/api-documentation/#access-tokens-and-token-scopes
    </a>
  </p>
  <p>
    2) After you get the accessToken/<span style={{color: '#f58'}}>Api Key </span>
  </p>
  <p>
    2) create A File named <span style={{color: '#f58'}}>.env.local</span>
  </p>
  <p>
    3) Then Put inside that file
    <span style={{color: '#7dd'}}> REACT_APP_MAPBOX_TOKEN</span>=
    <span style={{color: '#f58'}}>Your-Api-Key</span>
  </p>
  <p>
    the Api Key will look something like this:
    <code>pk.ey3ec5fHmFDo#o4fmD9@3kF9zxf55e78cd6407da2557706ca0-f8496</code>
  </p>
</>
)