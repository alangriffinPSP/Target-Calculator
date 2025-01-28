//TO DO:
//"Do you know your sales deficit?" option. Hide inputs if unnecessary

$(document).ready(function () {

    const calculator = {

        calculate() {

            $inputs = {
                target: $('#target').val(),
                actual: $('#actual').val(),
                weeks: $('#weeks').val()
            }

            //regex checking for numbers > 0 only
            if (!$inputs.target.match(/^[1-9][0-9]*$/) || !$inputs.actual.match(/^[1-9][0-9]*$/) || !$inputs.weeks.match(/^[1-9][0-9]*$/)) {
                $('#warning').css('display', 'inline-block');
                $('#warning').text("Numbers only, please");
                return;
            }

            const deficit = Math.round(parseInt($inputs.target) - parseInt($inputs.actual))
            const week = Math.round(deficit / parseInt($inputs.weeks))
            const day = Math.round(week / 7)
            let hour;
            if ($("input[name=openingTimes]:checked").val() == 1) {
                hour = Math.round(week / 57)
            } else {
                hour = (week / calculator.hourCalculation()).toFixed(2);
                console.log(hour);
            }
            const percentageDifference = 100 - (($inputs.actual / $inputs.target) * 100);

            if (deficit > 0) {
                $('#calculateButton').hide();
                // $('#calculateButton').css('display', 'none');
                $('#results').css('display', 'inline-block');
                $('#deficit').text(` £${deficit.toLocaleString()} `);
                $('#percentage').text(`(${percentageDifference.toFixed(1)}%)`);
                $('#weeksLeft').text(` ${$inputs.weeks} `);
                $('#targetWeek').text(`£${week.toLocaleString()} Per Week`);
                $('#targetDay').text(`£${day.toLocaleString()} Per Day`);
                $('#targetHour').text(`£${hour.toLocaleString()} Per Hour`);
                // console.log($inputs, deficit, week, day, hour, percentageDifference);
            } else {
                $('#congrats').show();
                $('#calculateButton').hide();
            }
        },

        hourCalculation() {
            //grabs inputs - MAKE OBJECT
            $timeInputs = {
            monSatStart: $("select[name='weekOpen']").val(),
            monSatEnd: $("select[name='weekClose']").val(),
            sunStart: $("select[name='sunOpen']").val(),
            sunEnd: $("select[name='sunClose']").val()
            }

            timeConvert = {
            weekStart: new Date("01/01/2025 " + $timeInputs.monSatStart),
            weekEnd: new Date("01/01/2025 " + $timeInputs.monSatEnd),
            sundayStart: new Date("01/01/2025 " + $timeInputs.sunStart),
            sundayEnd: new Date("01/01/2025 " + $timeInputs.sunEnd)
            }

            //calculates differences (ms to hours)
            hours = {
            weekHours: (((timeConvert.weekEnd - timeConvert.weekStart) / 60000) / 60) * 6,
            sunHours: ((timeConvert.sundayEnd - timeConvert.sundayStart) / 60000) / 60
            }

            const weeklyTotal = hours.weekHours + hours.sunHours;

            return weeklyTotal;
        },

        calculateClickListener() {
            $('#calculateButton').click(this.calculate);
        }
    }
    calculator.calculateClickListener();


    const pageElements = {

        clearForm() {
            $('#inputs').trigger('reset');
            $('#calculateButton').show();
            $('#congrats').hide();
            $('#results').hide();
            $('#warning').hide();
            $('#timeSelect').hide();
        },

        checkTimes() {
            $('input[type=radio][name=openingTimes]').change(function () {
                if ($("input[name=openingTimes]:checked").val() == 0) {
                    $('#timeSelect').show('fast');
                } else {
                    $('#timeSelect').hide('fast');
                }
            })
        },

        resetClickListener() {
            $('#resetButton').click(this.clearForm);
        }
    }
    pageElements.resetClickListener();
    pageElements.checkTimes();
    pageElements.clearForm();
    
    //Document end
});