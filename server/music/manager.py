from django.db import connection
from django.db import models


class BulkInsertManager(models.Manager):

    def bulk_insert_ignore(self, create_fields, values):
        db_table = self.model._meta.db_table
        value_sql = ', '.join(values)

        base_sql = f"INSERT IGNORE INTO {db_table} ({','.join(create_fields)}) VALUES ({value_sql})"
        return self.executemany(base_sql)

    @staticmethod
    def executemany(sql):
        cursor = connection.cursor()
        try:
            cursor.execute(sql)
            return True
        except Exception as e:
            print(e)
            return False


class SongManager(models.Manager):

    def get_queryset(self):
        return super().get_queryset().filter(hidden=False)
