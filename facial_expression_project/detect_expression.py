import cv2
import mediapipe as mp

# Initialize MediaPipe face mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh()

# Start webcam
cap = cv2.VideoCapture(0)

while True:
    success, frame = cap.read()
    if not success:
        break

    # Flip and convert color
    frame = cv2.flip(frame, 1)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Process frame
    result = face_mesh.process(rgb_frame)

    if result.multi_face_landmarks:
        for face_landmarks in result.multi_face_landmarks:
            h, w, _ = frame.shape

            # Get key landmarks
            top_lip = face_landmarks.landmark[13]
            bottom_lip = face_landmarks.landmark[14]
            left_mouth = face_landmarks.landmark[61]
            right_mouth = face_landmarks.landmark[291]

            # Convert to pixel coordinates
            top_y = int(top_lip.y * h)
            bottom_y = int(bottom_lip.y * h)
            left_x = int(left_mouth.x * w)
            right_x = int(right_mouth.x * w)

            # Calculate features
            mouth_gap = bottom_y - top_y        # Vertical gap
            mouth_width = right_x - left_x      # Horizontal width

            # Expression detection rules
            if mouth_gap > 25:
                expression = "Surprised 😲"
            elif mouth_width > 80:
                expression = "Happy 😊"
            else:
                expression = "Neutral 😐"

            # Draw landmarks
            for lm in face_landmarks.landmark:
                x, y = int(lm.x * w), int(lm.y * h)
                cv2.circle(frame, (x, y), 1, (0, 255, 0), -1)

            # Show expression text
            cv2.putText(frame, f"Expression: {expression}", (30, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    # Display the frame
    cv2.imshow("Facial Expression Detection", frame)

    # Exit when 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
