data = [
    {"question": "What is Baby Yoda's real name?", "answer": "Grogu"},
    {"question": "Where did Obi-Wan take Luke after his birth?", "answer": "Tatooine"},
    {"question": "What year did the first Star Wars movie come out?", "answer": "1977"},
    {"question": "Who built C-3PO?", "answer": "Anakin Skywalker"},
    {"question": "Anakin Skywalker grew up to be who?", "answer": "Darth Vader"},
    {"question": "What species is Chewbacca?", "answer": "Wookiee"}
]

def quiz():
    correct = 0
    wrong_answers = []

    for q in data:
        answer = input(q["question"] + " ").strip()
        if answer.lower() == q["answer"].lower():
            correct += 1
        else:
            wrong_answers.append({
                "question": q["question"],
                "your_answer": answer,
                "correct_answer": q["answer"]
            })

    show_results(correct, wrong_answers)

def show_results(correct, wrong_answers):
    incorrect = len(wrong_answers)
    print(f"\n Correct: {correct}")
    print(f" Incorrect: {incorrect}")

    if incorrect > 0:
        print("\nWrong Answers:")
        for w in wrong_answers:
            print(f"Q: {w['question']}")
            print(f"Your Answer: {w['your_answer']}")
            print(f"Correct Answer: {w['correct_answer']}\n")

    if incorrect > 3:
        print("You had more than 3 wrong answers. Let's try again!\n")
        quiz()

quiz()
