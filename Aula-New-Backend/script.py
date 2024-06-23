import sys
import ratemyprofessor

if __name__ == "__main__":
    input_data = sys.argv[1]
    X = 10 + 55
    result = f"Processed data: {input_data}"
    school = ratemyprofessor.get_school_by_name("University of California Berkeley")
    print(school.name)
    professor = ratemyprofessor.get_professor_by_school_and_name(ratemyprofessor.get_school_by_name("University of California Berkeley"), "Frenkel")
    professors = ratemyprofessor.get_professors_by_school_and_name(school, "")
    print(len(professors))
    print(school)

    if professor is not None:
        print("%sworks in the %s Department at the %s." % (professor.name, professor.department, professor.school.name))
        print("Rating: %s / 5.0" % professor.rating)
        print("Difficulty: %s / 5.0" % professor.difficulty)
        print("Total Ratings: %s" % professor.num_ratings)
        if professor.would_take_again is not None:
            print(("Would Take Again: %s" % round(professor.would_take_again, 1)) + '%')
        else:
            print("Would Take Again: N/A")
