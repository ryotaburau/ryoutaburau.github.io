$(function() {

  // 「スキャンする」を押したときのイベント
  $("#ScanButton").click(function() {
    scanBarcode();
    return false;
  });

  // 「ブラウザで開く」を押したときのイベント
  $("#BrowserOpenButton").click(function() {
    // invokeBrowserを用いてブラウザでURLを開く
    monaca.invokeBrowser($("#ResultMessage").text());
    return false;
  });

});

// 「スキャンする」を押したときに実行される関数
function scanBarcode() {
  // BarcodeScannerプラグインを利用してスキャン
  window.plugins.barcodeScanner.scan(
    // 成功時に実行されるコールバック（キャンセル時も含む）
    function(result) {
      // キャンセルされたら何もしない
      if (result.cancelled) {
        return;
      }

      // 結果テキストを表示
      $("#ResultMessage").text(result.text);

      // URLなら「ブラウザで開く」ボタンを表示
      if (result.text.indexOf("http") === 0) {
        $("#BrowserOpenButton").show();
      } else {
        $("#BrowserOpenButton").hide();
      }
    },
    // エラー時に実行されるコールバック
    function(error) {
      $("#ResultMessage").text(error);
    }
  );
}
