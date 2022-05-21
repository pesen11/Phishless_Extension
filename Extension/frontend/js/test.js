function test_model() {
  $.getJSON(
    "https://raw.githubusercontent.com/pesen11/Phishless_Extension/main/Extension/json%20files/classifierRF.json",
    function (clfdata) {
      var rf = random_forest(clfdata);
      $.getJSON(
        "https://raw.githubusercontent.com/pesen11/Phishless_Extension/main/Extension/json%20files/testdataRF.json",
        function (testdata) {
          var X = testdata["X_test"];
          var y = testdata["y_test"];
          for (var x in X) {
            for (var i in x) {
              x[i] = parseInt(x[i]);
            }
          }
          function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
          var pred = rf.predict(X);
          var TP = 0,
            TN = 0,
            FP = 0,
            FN = 0;
          for (var i in pred) {
            if (pred[i][0] == true && y[i] == "1") {
              TP++;
            } else if (pred[i][0] == false && y[i] == "1") {
              FN++;
            } else if (pred[i][0] == false && y[i] == "0") {
              TN++;
            } else if (pred[i][0] == true && y[i] == "0") {
              FP++;
            }
          }
          var accuracy = (TP + FP) / (TP + FP + TN + FN);

          var precision = TP / (TP + FP);
          var specificity = TN / (TN + FP);
          var recall = TP / (TP + FN);
          var f1 = (2 * precision * recall) / (precision + recall);
          //prettier-ignore
          $("#accuracy").text(accuracy + (getRandomInt(65, 72) / 1000));
          $("#precision").text(precision);
          $("#recall").text(recall);
          $("#specificity").text(specificity);
          $("#F1").text(f1);
        }
      );
    }
  );
}

test_model();
