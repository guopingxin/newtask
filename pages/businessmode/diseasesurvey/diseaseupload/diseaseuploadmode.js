
class Diseaseupload{

  //腾讯坐标转地址
  reverseGeocoder(demo, lat, lng, sCallback) {
    demo.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: lng
      },
      success(res) {
        sCallback && sCallback(res.result)
      },
      fail(error) {
        console.error(error);
      }
    })
  }


}

export {Diseaseupload}