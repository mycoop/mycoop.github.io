function openWinLarge(URL) {
  aWindow=window.open(URL,"demowindow", "toolbar=no,width=800,height=600,scrollbars=yes,resizable=yes");
  return void(0);
}
function openWinSize(URL,width,height) {
  aWindow=window.open(URL,"_blank", "toolbar=no,width="+width+",height="+height);
  return void(0);
}