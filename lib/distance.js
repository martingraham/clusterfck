module.exports = {
  euclidean: function(v1, v2) {
      var total = 0;
      for (var i = 0; i < v1.length; i++) {
         total += (v1[i] !== undefined && v2[i] !== undefined) ? Math.pow(v2[i] - v1[i], 2) : 0;
      }
      return Math.sqrt(total);
   },
   manhattan: function(v1, v2) {
     var total = 0;
     for (var i = 0; i < v1.length ; i++) {
        total += (v1[i] !== undefined && v2[i] !== undefined) ? Math.abs(v2[i] - v1[i]) : 0;
     }
     return total;
   },
   max: function(v1, v2) {
     var max = 0;
     for (var i = 0; i < v1.length; i++) {
        max = Math.max (max, (v1[i] !== undefined && v2[i] !== undefined) ? Math.abs(v2[i] - v1[i]) : 0);
     }
     return max;
   }
};
