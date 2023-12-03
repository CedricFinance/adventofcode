use day01::compute_calibration_value;

fn extract_digit(line: &str) -> Vec<u32> {
    line.chars().filter_map(|c| c.to_digit(10)).collect()
}

fn part1(input: &str) -> u32 {
    input.lines()
         .map(extract_digit)
         .map(compute_calibration_value)
         .sum()
}

fn main() {
    let input = include_str!("../../../../../inputs/2023/day01/input.txt");

    let result = part1(input);
    println!("The result is {}", result);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn part1_input() {
        let input = include_str!("../../../../../inputs/2023/day01/input.txt");

        let result = part1(input);

        assert_eq!(result, 54927);
    }
}
