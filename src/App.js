import "./App.css";

function App() {
  function whatis() {
    var output = document.getElementById("output"),
      datasize = 10000,
      missing = 5,
      missingElem = [];

    output.innerHTML = "";

    var dataset = (function (len, removeCount) {
      var arr = [];

      for (var i = 1; i < len; i++) {
        arr.push(i);
      }

      var removeIndex;

      for (var k = 0; k < removeCount; k++) {
        removeIndex = Math.floor(Math.random() * arr.length - 1);
        missingElem.push(arr.splice(removeIndex, 1));
      }

      return arr;
    })(datasize, missing);

    function chop(needle, hay, data) {
      testsRun++;
      data = data || {};

      var len = hay.length,
        cut = Math.floor(len / 2),
        testVal = hay[cut],
        comp = compare(needle, testVal);

      if (comp === 0) {
        return "found in " + testsRun + " tests.";
      } else {
        data.half = comp === -1 ? hay.slice(0, cut) : hay.slice(cut + 1);

        if (data.half.length > 0) {
          return chop(needle, data.half, data);
        } else {
          return "not found in " + testsRun + " tests.";
        }
      }
    }

    function compare(a, b) {
      if (a == b) {
        return 0;
      } else {
        return a < b ? -1 : 1;
      }
    }

    var testsRun,
      testResults = "",
      startTime = new Date(),
      endTime;

    for (var i = 1; i <= datasize; i++) {
      testsRun = 0;
      testResults += "<p>" + i + ": " + chop(i, dataset) + "</p>";
    }

    endTime = new Date();

    var elapsed = endTime.getTime() - startTime.getTime();
    var testTime =
      datasize + " tests completed in " + elapsed / 1000 + " seconds";

    missingElem = missingElem
      .sort(function (a, b) {
        return a - b;
      })
      .join(", ");

    output.innerHTML =
      "<p>" +
      testTime +
      "</p>" +
      "<p>Missing Elem: " +
      missingElem +
      "</p>" +
      testResults;
  }
  window.onload = function () {
    whatis();
  };

  return (
    <div className="App">
      {/* <h1>Hello</h1> */}
      <div class="container">
        <h1>Karate Chop Solution</h1>
        <p>By :Yogesh@17</p>
        <div id="output"></div>
      </div>
    </div>
  );
}

export default App;
