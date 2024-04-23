CREATE TABLE SurveyResponse (
    response_id SERIAL PRIMARY KEY,
    question_id INT,
    option_id INT,
    FOREIGN KEY (question_id) REFERENCES SurveyQuestion(question_id),
    FOREIGN KEY (option_id) REFERENCES Option(option_id)
);

-- Create SurveyQuestion table
CREATE TABLE SurveyQuestion (
    question_id SERIAL PRIMARY KEY,
    question_text TEXT,
    option_ids INT[] -- Array to store option IDs
);

-- Create Option table
CREATE TABLE Option (
    option_id SERIAL PRIMARY KEY, 
    option_text TEXT,
    question_id INT, -- Nullable
    FOREIGN KEY (question_id) REFERENCES SurveyQuestion(question_id)
);

-- Insert a survey question with multiple options
INSERT INTO SurveyQuestion (question_text, option_ids)
VALUES ('Which field do you prefer?', ARRAY[1, 2, 3, 4]);

INSERT INTO SurveyQuestion (question_text, option_ids)
VALUES ('Technology used in Web Development?', ARRAY[5,6,7]);

INSERT INTO SurveyQuestion (question_text, option_ids)
VALUES (' technology used in Android ?', ARRAY[8,9]);

INSERT INTO SurveyQuestion (question_text, option_ids)
VALUES ('technology used in AI/ML?', ARRAY[10,11]);

INSERT INTO SurveyQuestion (question_text, option_ids)
VALUES ('Which project You prefer in Java Development?', ARRAY[21,22]);

INSERT INTO SurveyQuestion (question_text, option_ids)
VALUES ('Which project you prefer in MEAN?', ARRAY[12,13,14]);

INSERT INTO SurveyQuestion (question_text, option_ids)
VALUES ('Which project you prefer in MERN?', ARRAY[13,15,16]);

INSERT INTO SurveyQuestion (question_text, option_ids)
VALUES ('Which project you prefer in HTML PHP and SQL?', ARRAY[15,16]);

INSERT INTO SurveyQuestion (question_text, option_ids)
VALUES ('Which Language You prefer in Android?', ARRAY[25,26]);

INSERT INTO SurveyQuestion (question_text, option_ids)
VALUES ('Which Project You prefer in Android?', ARRAY[17,18]);

INSERT INTO SurveyQuestion (question_text, option_ids)
VALUES ('Which Project You make in AI/ML?', ARRAY[19,20]);

INSERT INTO SurveyQuestion (question_text, option_ids)
VALUES ('Which Project You make in Java Development?', ARRAY[21,22]);

INSERT INTO SurveyQuestion (question_text, option_ids)
VALUES ('Which Mode of work you prefer', ARRAY[23,24]);

INSERT INTO Option (option_text, question_id)
VALUES 
    ('Web Development', 2),
    ('Android', 3),
    ('AI/ML', 4),
    ('Java Development', 5),
	('MEAN',6),
	('MERN',7),
	('HTML PHP SQL',8),
	('Flutter',9),
	('Android Studio',9),
	('Deep Neural Networks (DNN)',11),
    ('Generative Adversarial Networks',11),	
	('Task Manager',13),
	('chat Apllication',13),
	('online Learning',13),
	('LMS',13),
	('CMS',13),
	('Location Saver',13),
	('Restuarant App',13),
	('Basmati Rice price pridiction',13),
	('face detection',13),
	('jumping Game',13),
	('snake game',13),
	('Onsite',NULL),
	('Remote',NULL),
    ('Java',10),
	('Kotlin',10)
