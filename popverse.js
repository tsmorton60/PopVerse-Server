// (c) Timothy Morton, www.BibleAnalyzer.com
// Credits: Refilizer (Firefox))

// (c) Timothy Morton, www.BibleAnalyzer.com


var chapWin;
var chapWinId;
var chapTabId;
var vlWinId;
var vlTabId;
var vlTxts;
var popTxts;
var popBook;
var popChapInt;

var currentChap;

var vlListCount;
var vlVsCount;
var vlUrl;
var pageUrl;
var refCount;
var showXrefs = true;

var clrFrom;
var clrTo;
var clrRow;

var scnW = window.screen.width;
var scnH = window.screen.height;

//Custom area
var title = "PreservedWords.com Bible Study"
var colorTheme = 4;
//End custom

// Brown
if (colorTheme == 0) {
	clrFrom = "#FFFCED";
	clrTo = "#F7F2BB";
	clrRow = "#FFFBE7";
// Gray
} else if (colorTheme == 1) {
	clrFrom = "#FDFDFD";
	clrTo = "#EBEBEB";
	clrRow = "#F4F4F4";
// Red
} else if (colorTheme == 2) {
	clrFrom = "#FFF5F5";
	clrTo = "#FFDEDE";
	clrRow = "#FFF1F1";
// Green
} else if (colorTheme == 3) {
	clrFrom = "#F8FFF8";
	clrTo = "#DBFFDC";
	clrRow = "#EEFFEE";
// Blue
} else if (colorTheme == 4) {
	clrFrom = "#F6F6FF";
	clrTo = "#D8D8FA";
	clrRow = "#EFEFFF";
}



//var isMobile = false;
//if (/Mobi|Android/i.test(navigator.userAgent)) {
//    isMobile = true;
//}

function isTouch() { 
    return ( 'ontouchstart' in window ) ||  
           ( navigator.maxTouchPoints > 0 ); 
} 



var chapIdx = {
    "Gen": 50,
    "Exo": 40,
    "Lev": 27,
    "Num": 36,
    "Deu": 34,
    "Jos": 24,
    "Jdg": 21,
    "Rth": 4,
    "1Sa": 31,
    "2Sa": 24,
    "1Ki": 22,
    "2Ki": 25,
    "1Ch": 29,
    "2Ch": 36,
    "Ezr": 10,
    "Neh": 13,
    "Est": 11,
    "Job": 42,
    "Psa": 150,
    "Pro": 31,
    "Ecc": 12,
    "Son": 8,
    "Isa": 66,
    "Jer": 52,
    "Lam": 5,
    "Eze": 49,
    "Dan": 12,
    "Hos": 14,
    "Joe": 3,
    "Amo": 9,
    "Oba": 1,
    "Jon": 4,
    "Mic": 7,
    "Nah": 4,
    "Hab": 3,
    "Zep": 3,
    "Hag": 2,
    "Zec": 14,
    "Mal": 4,
    "Mat": 28,
    "Mar": 16,
    "Luk": 24,
    "Joh": 22,
    "Act": 28,
    "Rom": 16,
    "1Co": 16,
    "2Co": 13,
    "Gal": 6,
    "Eph": 6,
    "Phi": 4,
    "Col": 4,
    "1Th": 6,
    "2Th": 3,
    "1Ti": 6,
    "2Ti": 4,
    "Tit": 3,
    "Phm": 1,
    "Heb": 13,
    "Jam": 5,
    "1Pe": 5,
    "2Pe": 4,
    "1Jo": 5,
    "2Jo": 1,
    "3Jo": 1,
    "Jud": 1,
    "Rev": 22
};


var books = Object.keys(chapIdx);


function fullBook(bk) {
    var bookGrp = {
        'Gen': 'Genesis',
        'Exo': 'Exodus',
        'Lev': 'Leviticus',
        'Num': 'Numbers',
        'Deu': 'Deuteronomy',
        'Jos': 'Joshua',
        'Jdg': 'Judges',
        'Rth': 'Ruth',
        '1Sa': '1 Samuel',
        '2Sa': '2 Samuel',
        '1Ki': '1 Kings',
        '2Ki': '2 Kings',
        '1Ch': '1 Chronicles',
        '2Ch': '2 Chronicles',
        'Ezr': 'Ezra',
        'Neh': 'Nehemiah',
        'Est': 'Esther',
        'Job': 'Job',
        'Psa': 'Psalms',
        'Pro': 'Proverbs',
        'Ecc': 'Ecclesiastes',
        'Son': 'Song Of Solomon',
        'Isa': 'Isaiah',
        'Jer': 'Jeremiah',
        'Lam': 'Lamentations',
        'Eze': 'Ezekiel',
        'Dan': 'Daniel',
        'Hos': 'Hosea',
        'Joe': 'Joel',
        'Amo': 'Amos',
        'Oba': 'Obadiah',
        'Jon': 'Jonah',
        'Mic': 'Micah',
        'Nah': 'Nahum',
        'Hab': 'Habbakkuk',
        'Zep': 'Zephaniah',
        'Hag': 'Haggai',
        'Zec': 'Zechariah',
        'Mal': 'Malachi',
        'Mat': 'Matthew',
        'Mar': 'Mark',
        'Luk': 'Luke',
        'Joh': 'John',
        'Act': 'Acts',
        'Rom': 'Romans',
        '1Co': '1 Corinthians',
        '2Co': '2 Corinthians',
        'Gal': 'Galatians',
        'Eph': 'Ephesians',
        'Phi': 'Philippians',
        'Col': 'Colossians',
        '1Th': '1 Thessalonians',
        '2Th': '2 Thessalonians',
        '1Ti': '1 Timothy',
        '2Ti': '2 Timothy',
        'Tit': 'Titus',
        'Phm': 'Philemon',
        'Heb': 'Hebrews',
        'Jam': 'James',
        '1Pe': '1 Peter',
        '2Pe': '2 Peter',
        '1Jo': '1 John',
        '2Jo': '2 John',
        '3Jo': '3 John',
        'Jud': 'Jude',
        'Rev': 'Revelation',
    };

    return bookGrp[bk];
}

async function checkRef(ref, type) {
    //console.log(ref + ' cr')
    var grp = ref.split(',');
    var chap = ref.slice(0, ref.search(/:/) + 1);

    var txts = [];
    var txt = "";
    var g;
    for (g in grp) {
        //console.log(grp[g])
        g = grp[g].replace(/^\s+/, '');

        if (g.indexOf(':') > -1) {
            txt = await getRefText(g, type);
        } else {
            txt = await getRefText(chap + g, type);
        }
        txts.push(txt);
    }

    return txts.join('<br>');
};

async function getRefText(ref, type) {
    var vs = ref.slice(ref.search(/:/) + 1);
	
	// To return a value in an async function the calling function must use async/await also as checkRef() above
    
    let response = await fetch(currentPath + '/getBib.php?ref=' + ref);
    let vsTxt = await response.text();
    
    //console.log(vsTxt);
        
    if (ref.search('-') != -1) {
        var all = [];
        var hits = /(\d+)-(\d+)/.exec(ref);
        var chap = ref.slice(0, ref.search(/:/) + 1);
        var start = Number(hits[1]);
        var end = Number(hits[2]);
        var shorten = false;
        
        if (end - start > 6) {
            shorten = true;
            end = start + 6;
        }
        
        // Get whole chapter
        let response = await fetch(currentPath + '/getBib.php?ref=' + chap)
        let chapTxt = await response.text();
        let chapList = chapTxt.split('\n');
        //let vsRange = chapList.slice(start -1, end)
        //console.log(vsRange) ;
        
        // Get vs range from chap list.
        for (var i = start; i <= end; i++) {
            all.push('&nbsp;&nbsp;<b>' + i + '</b>' + ' ' + chapList[i -1]);
        }

        /*
        for (var i = start; i <= end; i++) {
            let response = await fetch(currentPath + '/getBib.php?ref=' + chap + i);
            let vsTxt = await response.text();
            all.push('&nbsp;&nbsp;<b>' + i + '</b>' + ' ' + vsTxt);
        }
        */
        
        if (shorten === true) {
            all.push('&nbsp;&nbsp;<i>Truncated, maximum 7 verses.</i>');
        }

        return all.join('&nbsp;&nbsp;<br>');
    
    } else {
        
        return '&nbsp;&nbsp;<b>' + vs + '</b>' + ' ' + vsTxt;
    }
    
    /*
    if (type === 1) {
        return '&nbsp;&nbsp;<b>' + ref + '</b>' + ' ' + vsTxt;
    } else {
        return '&nbsp;&nbsp;<b>' + vs + '</b>' + ' ' + vsTxt;
    }
    
    */
};




var oneTwoPatt = '(?:1|2|II?|First|Second|1st|2nd)\\s*';
var threePatt = '(?:3|III|Third|3rd)\\s*';

var bookPatts = [

    oneTwoPatt + 'Samuel', oneTwoPatt + 'Sam?\\.?',
    oneTwoPatt + 'Kings', oneTwoPatt + 'Ki\\.?', oneTwoPatt + 'Kgs\\.?',
    oneTwoPatt + 'Chronicles', oneTwoPatt + 'Chron\\.?', oneTwoPatt + 'Chr?\\.?',
    oneTwoPatt + 'Thessalonians', oneTwoPatt + 'Thess?\\.?', oneTwoPatt + 'Ths?\\.?',
    oneTwoPatt + 'Timothy', oneTwoPatt + 'Tim?\\.?',
    oneTwoPatt + 'Corinthians', oneTwoPatt + 'Cor?\\.?',
    oneTwoPatt + 'Peter', oneTwoPatt + 'Pet?\\.?',
    oneTwoPatt + 'John?', oneTwoPatt + 'Jn\\.?', oneTwoPatt + 'Jo\\.?',
    threePatt + 'John?', threePatt + 'Jn\\.?', threePatt + 'Jo\\.?',

    'Genesis', 'Gen?\\.?', 'Gn\\.?',
    'Exodus', 'Exo?d?\\.?',
    'Leviticus', 'Lev?\\.?',
    'Numbers', 'Num?\\.?',
    'Deuteronomy', 'Deu?t?\\.?', 'Dt\\.?',
    'Joshua', 'Josh?\\.?',
    'Judges', 'Ju?d?g\\.?', 'Jgs\\.?',
    'Ruth', 'Rut?\\.?', 'Rth\\.?',
    'Ezra', 'Ezr\\.?',
    'Nehemiah', 'Neh?\\.?',
    'Esther', 'Est?\\.?',
    'Job',
    'Psalms?', 'Psa?s?\\.?',
    'Proverbs', 'Pro?v?\\.?',
    'Ecclesiastes', 'Ecc?l?\\.?',
    'Song of Solomon', 'Song of Songs', 'Song?\\.?',
    'Isaiah', 'Isa?\\.?',
    'Jeremiah', 'Jer?\\.?',
    'Lamentations', 'Lam?\\.?',
    'Ezekiel', 'Eze?k?\\.?',
    'Daniel', 'Dan?\\.?', 'Dn\\.?',
    'Hosea', 'Hos?\\.?',
    'Joel', 'Joe\\.?',
    'Amos', 'Amo?\\.?',
    'Obadiah', 'Oba?\\.?',
    'Jonah', 'Jon\\.?',
    'Micah', 'Mic?\\.?',
    'Nahum', 'Nah?\\.?',
    'Habakkuk', 'Hab\\.?',
    'Zephaniah', 'Zeph?\\.?',
    'Haggai', 'Hagg?\\.?',
    'Zechariah', 'Zech?\\.?',
    'Malachi', 'Mal\\.?',
    'Matthew', 'Matt?\\.?', 'Mt\\.?',
    'Mark?\\.?', 'Mk\\.?', 'Mr\\.?',
    'Luke', 'Lu?k?\\.?',
    'John?\\.?', 'Jh?n\\.?',
    'Acts?', 'Ac\\.?',
    'Romans', 'Rom?\\.?', 'Rm\\.?',
    'Galatians', 'Gal?\\.?',
    'Ephesians', 'Eph?e?s?\\.?',
    'Philippians', 'Phil?\\.?', 'Philip\\.?', 'Php\\.?',
    'Colossians', 'Col?\\.?',
    'Titus', 'Tit\\.?',
    'Philemon', 'Philem\\.?', 'Phm\\.?',
    'Hebrews', 'He?b\\.?',
    'James', 'Jam?s?\\.?',
    'Jude?',
    'Revelation', 'Rev?\\.?'
];

// Get the path of this script
var scriptPath = function () {
    var scripts = document.getElementsByTagName('SCRIPT');
    var path = '';
    if(scripts && scripts.length >0) {
        for(var i in scripts) {
            if(scripts[i].src && scripts[i].src.match(/\/popverse\.js($|\?.*$)/)) {
                path = scripts[i].src.replace(/(.*)\/popverse\.js($|\?.*$)/, '$1');
                break;
            }
        }
    }
    return path;
};


var dashPatt = '(?:\u00AD|\u002D|\u2010|\u2011\u2012|\u2013|\u2212)';
//var verseOnlyPatt = '(?:,\\s*(?:(?:[Cc][h]?\\s*)?\\d{1,3}([:.v]|(\\s*v))\\s*)?\\d{1,3}(?:' + dashPatt + '(?:(?:[Cc][h]?\\s*)?\\d{1,3}([:.v]|(\\s*v))\\s*)?\\d{1,3}|ff|f)?)*';


// Create regular expression to match references
// Improved hyphen matching Aug 2008
var fullRefPatt =
    '(' + bookPatts.join('|') + ')\\s*' +
    '(?:(?:[Cc][h]?\\s*)?\\d{1,3}([:.v]|(\\s*v))\\s*)\\d{1,3}' +
    '(?:' + dashPatt + '\\d{1,3})?' +
    '((?:,\\s*\\d+)?(?:' + dashPatt + '\\d+)?)*(?!:?\\d|\\s?(Sa|Ki|Ch|Co|Th|Ti|Pe|Jo))';

var partRefPatt =
    '\\b(?:[Cc][h]?\\s*)?\\d{1,3}([:.v]|(\\s*v))\\s*\\d{1,3}' +
    '(?:' + dashPatt + '\\d{1,3})?' +
    '((?:,\\s*\\d+)?(?:' + dashPatt + '\\d+)?)*(?!:?\\d|\\s?(Sa|Ki|Ch|Co|Th|Ti|Pe|Jo))';

var regExp = new RegExp('(?:' + fullRefPatt + ')|(?:' + partRefPatt + ')');

//console.log(regExp)


var showTimer = 0;
var hideTimer = 0;
var delay = 200;
var container;
var popup;
var count = 0;


// Handles page loading
//
function onPageLoad(evt) {
	
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = "span.capt {font-family: Verdana, Calibri, Geneva, sans-serif; 	font-size: 10pt; font-weight: bold; color: #7F2222;	display: block; margin: .3em .6em .3em .6em; padding: 0 0 .3em 0; 	border-bottom: solid 1px;} span.foot {font-family: Verdana, Calibri, Geneva, sans-serif; color: #000000; text-align: center; padding: 0.6em 0 0 0; font-size: .8em; color: gray; display: block;}";
	document.head.appendChild(css);

	currentPath = scriptPath();
	refLinker(document);

	createContainer();
	
	//if (isTouch() == true) {
	//	document.addEventListener('touchstart', onTouch, false);
	//} else {
	
		document.addEventListener("click", hideAllTooltips, false);
		//document.addEventListener("touchstart", hideAllTooltips, false);
	
	//}
	
}


function fixBook(bk) {

    var bookDict = {
        "[1I] ?Jo": "1Jo",
        "(2|II) ?Jo": "2Jo",
        "(3|III) ?Jo": "3Jo",
        "[1I] ?Jn": "1Jo",
        "(2|II) ?Jn": "2Jo",
        "(3|III) ?Jn": "3Jo",
        "Ge": "Gen",
        "Ex": "Exo",
        "Le": "Lev",
        "Nu": "Num",
        "De": "Deu",
        "Jos": "Jos",
        "Judg": "Jdg",
        "Jg": "Jdg",
        "Ru": "Rth",
        "[1I] ?Sa": "1Sa",
        "(2|II) ?Sa": "2Sa",
        "[1I] ?Ki": "1Ki",
        "(2|II) ?Ki": "2Ki",
        "[1I] ?Ch": "1Ch",
        "(2|II) ?Ch": "2Ch",
        "Ezr": "Ezr",
        "Ne": "Neh",
        "Es": "Est",
        "Job": "Job",
        "Ps": "Psa",
        "Pr": "Pro",
        "Ec": "Ecc",
        "So": "Son",
        "Is": "Isa",
        "Je": "Jer",
        "La": "Lam",
        "Eze": "Eze",
        "Da": "Dan",
        "Dn": "Dan",
        "Ho": "Hos",
        "Joe": "Joe",
        "Am": "Amo",
        "Ob": "Oba",
        "Jon": "Jon",
        "Mi": "Mic",
        "Na": "Nah",
        "Hab": "Hab",
        "Zep": "Zep",
        "Hag": "Hag",
        "Zec": "Zec",
        "Mal": "Mal",
        "Jgs": "Jdg",
        "Rth": "Rth",
        "Mat": "Mat",
        "Mar": "Mar",
        "Mr": "Mar",
        "Lu": "Luk",
        "Joh": "Joh",
        "Ac": "Act",
        "Ro": "Rom",
        "[1I] ?Co": "1Co",
        "(2|II) ?Co": "2Co",
        "Ga": "Gal",
        "Ep": "Eph",
        "Phi": "Phi",
        "Php": "Phi",
        "Col": "Col",
        "[1I] ?Th": "1Th",
        "(2|II) ?Th": "2Th",
        "[1I] ?Ti": "1Ti",
        "(2|II) ?Ti": "2Ti",
        "Tit": "Tit",
        "He": "Heb",
        "Ja": "Jam",
        "[1I] ?Pe": "1Pe",
        "(2|II) ?Pe": "2Pe",
        "Jud": "Jud",
        "Re": "Rev",
        "Mt": "Mat",
        "Mk": "Mar",
        "Lk": "Luk",
        "Jn": "Joh",
        "Jas": "Jam",
        "[1I] ?Kgs": "1Ki",
        "2|II ?Kgs": "2Ki",
        "Phm": "Phm",
        "Phile": "Phm",
        "Jdg": "Jdg",
        "1S": "1Sa",
        "2S": "2Sa",
        "1K": "1Ki",
        "2K": "2Ki",
        "1P": "1Pe",
        "2P": "2Pe",
        "1J": "1Jo",
        "2J": "2Jo",
        "3J": "3Jo",
        "Jde": "Jud",
        "Tts": "Tit",
        "Jhn": "Joh",
    };

    var b;
    for (b in bookDict) {
        var patt = new RegExp(b + "\\w*");
        if (patt.test(bk)) {
            return bookDict[b];
        }
    }
    return bk;
}


function parseRef(ref) {
    //console.log( ref + ' r2');

    var patt = /((?:1|2|3|II?I?|First|Second|Third|1st|2nd|3rd)?\s?\w+)\.?\s?(?:[Cc]h)?(\d+)[:.v] ?(.+)/;
    var result = patt.exec(ref);
    var ch = result[2].replace(' ', '_');
    var bk = result[1].replace(' ', '');
    var vs = result[3];

    bk = bk.replace(/Third|III|3rd/, '3');
    bk = bk.replace(/Second|II|2nd/, '2');
    bk = bk.replace(/First|I\b|1st/, '1');

    //console.log(bk)

    bk = fixBook(bk)
    vs = vs.replace(new RegExp(dashPatt, 'g'), '-');

    //console.log(ch + ' r4');
    return [bk, ch, vs];
}

function parsePartRef(ref) {
    //console.log(ref);
    var patt = /(\d+)[:.v] ?(.+)/;
    var result = patt.exec(ref);
    var ch = result[1];
    var vs = result[2];
    vs = vs.replace(new RegExp(dashPatt, 'g'), '-');

    return [ch, vs];
}

//var linkType = 0

var linkType;

var colorTheme;


// Saves last tagged book for a partial reference.
// Placed here so it will be saved beyond current element (paragraph). Can cause false ref.
var doPartial;

// Based on Firefox Refilizer add-on
function refLinker(doc) {
    var target = true ? "_blank" : "_self";
	
	var textNodes = document.evaluate("//*/text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
	//console.log(textNodes);

    // Get regular expression for matching references
    var refRegExp = regExp

	var refSearchURL = "popverse://pv/bible+av/%B%C:%V";
	
    for (var i = 0; i < textNodes.snapshotLength; i++) {
        var textNode = textNodes.snapshotItem(i);
        var textNode2 = null;
        var parNode = textNode.parentNode;

        //console.log(doPartial)

        if (doPartial === false) {
            var lastBook = null;
        }

        var matches = null;

        //console.log(textNode.data);
        //console.log(parNode);

        if (/^(a|script|style|button|title|form|head|h1|h2|h3|h4)$/.test(parNode.nodeName.toLowerCase()) != true) {
            // Search for references in text

            while (matches = refRegExp.exec(textNode.data)) {

                //console.log(textNode.data);
                //console.log(matches);

                // Get text of reference
                var ref = matches[0];
                // Get text before and after reference
                var textBeforeRef = matches.input.substring(0, matches.index);
                var textAfterRef = matches.input.substring(matches.index + ref.length);
                // Compress whitespace in text of reference
                ref = ref.replace(/\s+/g, " ");

                //console.log(ref + ' r1');
                //console.log(textAfterRef);

                if (matches[1]) {
                    // Get text of book (for subsequent partial references)
                    lastBook = matches[1];
                    // Remove extra whitespace from text of book
                    //lastBook = lastBook.replace(/\s+/g, " ");

                    var result = parseRef(ref);
                    //console.log(result + ' res');

                    var bk = result[0];
                    var ch = result[1];
                    var vs = result[2];

                    lastBook = bk

                    // Update text node to contain text before reference
                    textNode.data = textBeforeRef;
                    // Add hyperlink element containing reference
                    var elemNode = doc.createElement("a");
                    var href = refSearchURL
                        .replace("%B", bk + '_')
                        .replace("%C", ch)
                        .replace("%V", vs);
                    var baRef = bk + '_' + ch + ':' + vs;

                    //console.log(matches);

                    elemNode.setAttribute("href", href);
                    elemNode.setAttribute("id", baRef);
					//elemNode.setAttribute("rel", "noopener");
                    elemNode.innerHTML = ref;
                    parNode.insertBefore(elemNode, textNode.nextSibling);

                    // Add second text node containing text after reference
                    textNode2 = doc.createTextNode(textAfterRef);
                    parNode.insertBefore(textNode2, elemNode.nextSibling);
	
					if (isTouch() == true) {
						document.addEventListener('touchstart', onTouch, false);
					} else {
						//document.addEventListener('click', onRefClick, false);
						elemNode.addEventListener("mouseover", linkMouseover, false);
						elemNode.addEventListener("mouseout", linkMouseout, false);
						elemNode.addEventListener("click", onClick, false);
                    }
					count += 1;

                } else if (lastBook != null) {
                    // Update text node to contain text before reference
                    textNode.data = textBeforeRef;

                    // Add hyperlink element containing reference
                    var elemNode = doc.createElement("a");

                    var result = parsePartRef(ref);
                    var ch = result[0];
                    var vs = result[1];

                    var href = refSearchURL
                        .replace("%B", '')
                        .replace("%C", lastBook + '_' + ch)
                        .replace("%V", vs);

                    var fullRef = lastBook + '_' + ch + ':' + vs 
                    
                    elemNode.setAttribute("href", href);
                    elemNode.setAttribute("id", fullRef);
                    elemNode.innerHTML = ref;
                    parNode.insertBefore(elemNode, textNode.nextSibling);

                    // Add second text node containing text after reference
                    textNode2 = doc.createTextNode(textAfterRef);
                    parNode.insertBefore(textNode2, elemNode.nextSibling);

					if (isTouch() == true) {
						document.addEventListener('touchstart', onTouch, false);
					} else {
						//document.addEventListener('click', onRefClick, false);
						elemNode.addEventListener("mouseover", linkMouseover, false);
						elemNode.addEventListener("mouseout", linkMouseout, false);
						elemNode.addEventListener("click", onClick, false);
                    }
                    count += 1;

                } else {
                    // Update text node to contain text up to end of reference
                    textNode.data = textBeforeRef + ref;
                    // Add second text node containing text after reference
                    textNode2 = doc.createTextNode(textAfterRef);
                    parNode.insertBefore(textNode2, textNode.nextSibling);
                }
                // Continue to search for references in text after reference
                textNode = textNode2;
            }
        }
    }
}


var linkMouseout = function(evt) {
    if (!evt) {
        evt = window.event;
    }
    if (evt.target.nodeName.toLowerCase() == 'a' && showTimer) {
        window.clearTimeout(showTimer);
        window.clearTimeout(hideTimer);
        hideTimer = window.setTimeout(function() {
            hideAllTooltips(evt)
        }, delay);
    }
}


var linkMouseover = function(e) {
    if (!e) {
        e = window.event;
    }
    if (e.target.nodeName.toLowerCase() == 'a') {
        window.clearTimeout(showTimer);
        showTimer = window.setTimeout(function() {
            onHover(e)
        }, delay);
    }
}

async function onClick(evt) {
    if (!evt) {
        var evt = window.event;
    }
	
	evt.stopPropagation();
	evt.preventDefault();

    if (linkType == 1) {
        console.log('Linktype set for Bible Analyzer');
        return
    }

    //var link = evt.target || evt.srcElement;
    //var origref = link.href.match(/\/(\w\w\w_.*?)$/)[1];
    //var ref = origref.replace("_", " ");
    
    var ref = evt.target.id.replace("_", " ");
    
    var chap = ref.slice(0, ref.search(/:/) + 1);
    var vss = ref.slice(ref.search(/:/) + 1).split((/[-,]+/));
    var bk = (ref.slice(0, 3));
    var chInt = chap.match(/\w\w\w (\d+):/)[1];
    
    
    let response = await fetch(currentPath + '/getBib.php?ref=' + chap)
    let vsTxt = await response.text();
	//console.log(vsTxt);

	
    vsList = vsTxt.split('\n');
	var formatedChap = formatChap(chap, vsList, vss);
	
	if (localStorage.pvChapWidth) {
		posx = parseInt(localStorage.pvChapScreenx);
		posy = localStorage.pvChapScreeny;
		width = localStorage.pvChapWidth;
		height = localStorage.pvChapHeight;
	} else {
		posx = (screen.width/2)-(1900/2);
		posy = (screen.height/2)-(1000/2);    
		width = 500;
		height = 700;    
	}
	
	var windowFeatures = 'toolbar=no, location=no, directories=no, status=yes, menubar=no, titlebar=no, scrollbars=yes, resizable=yes, ';
	
	if(chapWin && !chapWin.closed){  //checks to see if window is open
		chapWin.focus();
		loadChap(chapWin, formatedChap, bk, chap, chInt, clrFrom, clrTo);
	} else{
		chapWin = window.open(currentPath + '/chap.html', 'pv_Chap', windowFeatures +' width='+ width +', height='+ height +', top='+ posy +', left='+ posx);
		chapWin.onbeforeunload = function(){
			localStorage.setItem("pvChapScreenx", chapWin.screenX.toString());
			localStorage.setItem("pvChapScreeny", chapWin.screenY);
			localStorage.setItem("pvChapWidth", chapWin.innerWidth);
			localStorage.setItem("pvChapHeight", chapWin.innerHeight);

		}
		chapWin.onload = function() {
			loadChap(chapWin, formatedChap, bk, chap, chInt, clrFrom, clrTo);
		}
	}
}

function loadChap(win, formatedChap, bk, chap, chInt, clrFrom, clrTo) {
	win.document.getElementById("main").innerHTML = formatedChap;
	win.document.title = 'PopVerse Chapter - ' + fullBook(bk) + ' ' + chap + ': (King James Bible)';

	var head = '<h1 class="bib">' + fullBook(bk) + '</h1><h2 class="bib">Chapter ' + chInt + '</h2><p class="chapHead2"><i>Authorized King James Bible</i></p>';
	var headElem = chapWin.document.getElementById("head");
	headElem.innerHTML = head;
	
	var head1 = win.document.getElementById("head1");
	head1.style.background = "-webkit-gradient(linear, left top, left bottom, from("+clrFrom+"), to("+clrTo+"))";
	
	var foot = '<font color="#990000"><b>' + title + '</b></font><br>&#169; 2019, <a href="https://www.PreservedWords.com/popverse.html" target="_blank" >PopVerse Bible Reference System</a></font>'
	var footElem = win.document.getElementById("foot");
	footElem.innerHTML = foot;

	var foot1 = win.document.getElementById("foot1");
	foot1.style.background = "-webkit-gradient(linear, left top, left bottom, from("+clrFrom+"), to("+clrTo+"))";

	var elem = win.document.getElementsByClassName('vsHilite');
	
	if (elem.length > 0) {
		smoothScroll(elem[0].id, 175, win);
	} else {
		window.scrollTo(0, 0);
	}
}

function formatChap(chap, vsList, vss) {
    var txts = [];
	
    for (idx in vsList) {
		if (vsList[idx] == "") {
			continue;
		}			
        var vs = parseInt(idx) + 1;
        var clss = 'verse';
        if (vss.includes(vs.toString())) {
            clss = 'vsHilite';
        }
		
		var vsTxt = '<a name="' + vs + '"></a><div class="' + clss + '" id="vs' + vs + '"><b>' + vs + '</b> ' + vsList[vs -1] + '</div>';
		txts.push(vsTxt);
	}
    return txts.join('');
}




async function onHover(evt) {
    if (!evt) {
        var evt = window.event;
    }

    hideAllTooltips(evt);
	
	//console.log(evt.target.href);
	
	if (!evt.target.href || !evt.target.href.startsWith("popverse")) {
		//console.log('not link') 
		return
	}

    //var link = evt.target || evt.srcElement;
    //var ref = link.href.match(/\/(\w\w\w_.*?)$/)[1].replace("_", " ");
    var ref = evt.target.id.replace("_", " ");
    
    //console.log(evt, ref, 'hover')
	
    var vsTxt;

	vsTxt = await checkRef(ref, 0);

	if(evt.type == 'touchstart' || evt.type == 'touchmove' || evt.type == 'touchend' ){
		var posX = evt.targetTouches[0].clientX; 
		var posY = evt.targetTouches[0].clientY;
		var width = "320px";
		console.log('is touch') 
	} else {
		var posX = evt.clientX;
		var posY = evt.clientY;
		var width = "340px";
	}



	//var pos = getElementPosition(link);
	var chap = ref.slice(0, ref.search(/:/) + 1);

	var vsData = '<span class="body"><span class="capt">' + chap + ' - King James Bible</span>' + vsTxt + '<span class="foot">' + title + '</span></span>'

	popup = document.createElement("div");
	popup.id = "popverse-" + ref;
	popup.style.display = "block";
	popup.style.position = "absolute";
	popup.style.textAlign = "left";
	popup.style.width = width;
	popup.style.zIndex = "999";
	popup.style.left = "2em";
	popup.style.fontFamily = "Verdana, Calibri, Tahoma, Geneva, sans-serif";
	popup.style.fontSize = "10pt";
	popup.style.color = "#000000";
	popup.style.lineHeight = "normal";
	popup.style.top = "2em";
	popup.style.padding = "0.4em .4em 0.6em .8em";
	popup.style.WebkitBorderRadius = "5px";
	popup.style.backgroundColor = "#FCFCFC";
	popup.style.webkitBoxShadow = '0px 0px 7px #555';
	popup.style.boxShadow = '0px 0px 7px #555'; 
	popup.style.background = "-webkit-gradient(linear, left top, left bottom, from(" + clrFrom + "), to(" + clrTo + "))";
	popup.innerHTML = vsData;
	popup.style.visibility = "hidden"
	container.appendChild(popup);

	var winW = window.innerWidth || document.documentElement.offsetWidth;
	var winH = window.innerHeight || document.documentElement.offsetHeight;
	var vScroll = window.pageYOffset || document.documentElement.scrollTop - 20
	var hScroll = window.pageXOffset || document.documentElement.scrollLeft

	var popW = popup.offsetWidth;
	var popH = popup.offsetHeight;
    
     console.log(winW, 'winW') 
     
     if (winW < 500) {
		 console.log('Narrow display. Center popup');
		 var west = winW /2 - popW /2;
		 
	 } else {
		 var west = posX + hScroll + 20;
		 if (posX + popW + 20 > winW) {
			 west = posX - popW + hScroll - 20;
             if (west < 20) {
                 west = winW /2 - popW /2;
             }
		 }
	 }
     
	 var north = posY + vScroll + 20;
	 if (posY + popH + 50 > winH) {
		 north = posY - popH + vScroll - 15;
	 }
	 
	 popup.style.top = north + 'px';
	 popup.style.left = west + 'px';
	
    
    popup.style.visibility = "visible"

};

// Determines double tap
var clickTimer = null;
function onTouch(evt) {
	//console.log(evt.target) 
	
    if (clickTimer == null) {
        clickTimer = setTimeout(function () {
            clickTimer = null;
            onHover(evt);
        }, 300)
    } else {
        clearTimeout(clickTimer);
        clickTimer = null;
        //onClick(evt);
    }
}


function elemNodes(elem) {
    nodes = [];
    for (var i = 0; i < elem.childNodes.length; i++) {
        if (elem.childNodes[i].nodeType == 1)
            nodes.push(elem.childNodes[i]);
    }
    return nodes;
}


function getElementPosition(elem) {
    var posX = 0;
    var posY = 0;

    while (elem != null) {
        posX += elem.offsetLeft;
        posY += elem.offsetTop;
        elem = elem.offsetParent;
    }
    return {
        x: posX,
        y: posY
    };
}


var createContainer = function() {
    container = document.createElement('div');
    container.id = 'popup-container';
    document.body.appendChild(container);
}


var hideAllTooltips = function(e) {
    var divs = container.children;
    var len = divs.length;
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = 'none';
    }
    for (var i = 0; i < divs.length; i++) {
        divs[i].remove();
    }
}

// Smooth scroll
function currentYPosition(win) {
    if (self.pageYOffset)
        return self.pageYOffset;
    if (win.document.documentElement && win.document.documentElement.scrollTop)
        return win.document.documentElement.scrollTop;
    if (win.document.body.scrollTop)
        return win.document.body.scrollTop;
    return 0;
}

function elmYPosition(eID, win) {
    var elm = win.document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != win.document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}

function smoothScroll(eID, offset, win) {
    var startY = currentYPosition(win);
    var stopY = elmYPosition(eID, win) - offset;

    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout(function() {win.scrollTo(0, leapY, timer * speed);});
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }
        return;
    }
    for (var i = startY; i > stopY; i -= step) {
        setTimeout(function() {win.scrollTo(0, leapY, timer * speed);});
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
}

window.addEventListener("DOMContentLoaded", onPageLoad, false);