console.log("ran");
function prep () {
	play = false;
	function setPlayState(playState) {
		if (playState) {
			play = true;
			recursiveContinue();
			$(".pauseButton").show();
			$(".playButton").hide();
		} else {
			play = false;
			clearTimeout(timeOutSet);
			$(".pauseButton").hide();
			$(".playButton").show();
		}
	}
	
	$(".first").click(function() {
		setUpWordSplit();
		setPlayState(false);
		recursiveContinue();
	});
	
	timeOutSet = null;
	
	setPlayState(false);
	
	letterMsMuliplier = 200;
	wordsSplitI = 0;
	wordSplit = [];
	function setUpWordSplit() {
		wordsSplit = $(".read .content").html().trim().split(" ");
		wordsSplitI = 0;
	}
	setUpWordSplit();
	$("#speed")[0].value = $("#speed")[0].max - letterMsMuliplier;
	
	leftSpacing = 10;
	$(".vertical").html("&nbsp;".repeat(leftSpacing));
	function recursiveContinue () {
		if (wordsSplitI < wordsSplit.length) {
			word = wordsSplit[wordsSplitI];
			letterLocation = Math.ceil(word.length/3);
			ward =
				"&nbsp;".repeat(leftSpacing-letterLocation)
				+ word.substring(0,letterLocation)
				+ "<span class='letterSpecial'>" + word.substring(letterLocation, letterLocation+1) + "</span>"
				+ word.substring(letterLocation+1,word.length)
			;
			if (word.length < 3) {
				ward = "&nbsp;".repeat(2-word.length) + ward;
			}
			$(".currentWord").html(ward);
			if (play) {
				timeOutSet = setTimeout(recursiveContinue,letterMsMuliplier * letterLocation);
			}
		}
		wordsSplitI++;
	}
	recursiveContinue();
	
	$("#speed").on('input',function() {
		letterMsMuliplier = $(this)[0].max - $(this)[0].value;
	});
	
	$(".pauseButton").hide();
	$(".playButton").click(function () {
		setPlayState(true);
	});
	$(".pauseButton").click(function () {
		setPlayState(false);
	});
}

prep();