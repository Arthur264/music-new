from django.core.exceptions import ValidationError

def validate_length(value,length=3):
    if len(str(value)) < length:
        raise ValidationError(f'{valie} is not the correct length')