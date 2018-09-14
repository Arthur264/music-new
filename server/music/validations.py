from django.core.exceptions import ValidationError

def validate_length(value,length=3):
    print("******************", value)
    if len(str(value)) < length:
        raise ValidationError(f'{value} is not the correct length')