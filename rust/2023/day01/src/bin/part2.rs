use day01::compute_calibration_value;

fn extract_digit(line: &str) -> Vec<u32> {
    let mut digits = Vec::new();

    let mut remaining_line = line;

    while remaining_line.len() > 0 {
        if remaining_line.starts_with("zero") {
            digits.push(0);
            remaining_line = &remaining_line[3..];
        } else if remaining_line.starts_with("one") {
            digits.push(1);
            remaining_line = &remaining_line[2..];
        } else if remaining_line.starts_with("two") {
            digits.push(2);
            remaining_line = &remaining_line[2..];
        } else if remaining_line.starts_with("three") {
            digits.push(3);
            remaining_line = &remaining_line[4..];
        } else if remaining_line.starts_with("four") {
            digits.push(4);
            remaining_line = &remaining_line[3..];
        } else if remaining_line.starts_with("five") {
            digits.push(5);
            remaining_line = &remaining_line[3..];
        } else if remaining_line.starts_with("six") {
            digits.push(6);
            remaining_line = &remaining_line[2..];
        } else if remaining_line.starts_with("seven") {
            digits.push(7);
            remaining_line = &remaining_line[4..];
        } else if remaining_line.starts_with("eight") {
            digits.push(8);
            remaining_line = &remaining_line[4..];
        } else if remaining_line.starts_with("nine") {
            digits.push(9);
            remaining_line = &remaining_line[3..];
        } else {
            let fist_char = remaining_line.chars().next().expect("can't be empty");
            if fist_char >= '0' && fist_char <= '9' {
                digits.push(fist_char.to_digit(10).expect("is a digit"));
                remaining_line = &remaining_line[1..];
            } else {
                remaining_line = &remaining_line[1..];
            }
        }
    }

    digits
}

fn part2(input: &str) -> u32 {
    input.lines()
         .map(extract_digit)
         .map(compute_calibration_value)
         .sum()
}

fn main() {
    let input = include_str!("../../../../../inputs/2023/day01/input.txt");

    let result = part2(input);
    println!("The result is {}", result);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn part1_input() {
        let input = include_str!("../../../../../inputs/2023/day01/input.txt");

        let result = part2(input);

        assert_eq!(result, 54581);
    }
}
