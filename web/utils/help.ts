export const getResourceUrl = () => {
  return location.host.split('.').every(e => !isNaN(+e)) ? 'http://192.168.123.51:50105' : 'https://file.starvincci.ltd'
}
