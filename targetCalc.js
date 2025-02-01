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

            //now using getters to maintain 'results' object
            results = {
                get deficit(){ 
                return Math.round(parseInt($inputs.target) - parseInt($inputs.actual));
                },  
                get week(){ 
                return Math.round(results.deficit / parseInt($inputs.weeks));
                },
                get day(){
                return Math.round(results.week / 7);
                },
                hour: 0,
            }

            //determines if hours calculation is required
            if ($("input[name=openingTimes]:checked").val() == 1) {
                results.hour = Math.round(results.week / 57)
            } else {
                results.hour = (results.week / calculator.hourCalculation()).toFixed(2);
            }
            const percentageDifference = 100 - (($inputs.actual / $inputs.target) * 100);

            if (results.deficit > 0) {
                $('#calculateButton').hide();
                $('#results').css('display', 'inline-block');
                $('#deficit').text(` £${results.deficit.toLocaleString()} `);
                $('#percentage').text(`(-${percentageDifference.toFixed(1)}%)`);
                $('#weeksLeft').text(` ${$inputs.weeks} `);
                $('#targetWeek').text(`£${results.week.toLocaleString()} Per Week`);
                $('#targetDay').text(`£${results.day.toLocaleString()} Per Day`);
                $('#targetHour').text(`£${results.hour.toLocaleString()} Per Hour`);
                $('#warning').hide()
                console.log($inputs, results);
            } else {
                $('#congrats').show();
                $('#calculateButton').hide();
                $('#warning').hide()
            }
            
        },

        hourCalculation() {
            
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