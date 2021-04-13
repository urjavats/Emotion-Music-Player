import cv2
video_capture=cv2.VideoCapture(0)
def noLight():
    return video_capture.read()
