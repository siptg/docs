function getCookie(name) {
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function eraseCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getParam(name) {
  if (name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)) {
    return decodeURIComponent(name[1]);
  }
}

if (partner = getParam("ref")) {
  setCookie("partner", partner, 30);
} else if (partner = getParam("utm_medium")) {
  setCookie("partner", partner, 30);
}

let cpartner = getCookie("partner") || "docs";
for (let linkElem of document.querySelectorAll('a')) {
  let url;
  try {
    url = new URL(linkElem.href);
  } catch (e) {
    continue;
  }
  ["siptg_bot", "siptg_entry_bot"].forEach(function(bot) {
    if (url.hostname === "t.me" && url.pathname === "/" + bot) {
      const startParam = url.searchParams.get("start");
      if (startParam !== null) {
        url.searchParams.set("start", `utm_${cpartner}=${startParam}`);
      } else {
        url.searchParams.set("start", `utm_${cpartner}`);
      }
      linkElem.href = url.toString();
    }
  });
}