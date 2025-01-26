//TO DO:
//"Do you know your sales deficit?" option. Hide inputs if unnecessary
//Add time options for differing opening hours

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
            const hour = Math.round(week / 57) //Based on 9:30-17:30 Mon-Fri & 10:00-16:00 Sunday. Add time options later?
            const percentageDifference = 100 - (($inputs.actual / $inputs.target) * 100);

            if (deficit > 0) {
                $('#calculateButton').css('display', 'none');
                $('#results').css('display', 'inline-block');
                $('#deficit').text(` £${deficit.toLocaleString()} `);
                $('#percentage').text(`(${percentageDifference.toFixed(1)}%)`);
                $('#weeksLeft').text(` ${$inputs.weeks} `);
                $('#targetWeek').text(`£${week.toLocaleString()} Per Week`);
                $('#targetDay').text(`£${day.toLocaleString()} Per Day`);
                $('#targetHour').text(`£${hour.toLocaleString()} Per Hour`);
                console.log($inputs, deficit, week, day, hour, percentageDifference);
            } else {
                $('#congrats').css('display', 'inline-block');
                $('#calculateButton').css('display', 'none');
            }
        },

        calculateClickListener() {
            $('#calculateButton').click(this.calculate)
        }
    }
    calculator.calculateClickListener();


    const pageElements = {
        clearForm() {
            $('#inputs').trigger('reset');
            $('#calculateButton').css('display', 'inline');
            $('#congrats').css('display', 'none');
            $('#results').css('display', 'none');
            $('#warning').css('display', 'none');
        },

        resetClickListener() {
            $('#resetButton').click(this.clearForm);
        }
    }
    pageElements.resetClickListener();

    pageElements.clearForm();
    //Document end
});